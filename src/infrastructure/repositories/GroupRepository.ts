import { IGroupRepository } from '../../domain/repositories/IGroupRepository';
import { Group } from '../../domain/entities/Group';
import { GroupMemberModel } from '../database/model/GroupMemberModel';
import { GroupModel } from '../database/model/GroupModel';

export class GroupRepository implements IGroupRepository {
  async createGroup(name: string, ownerId: string): Promise<Group> {
    const newGroup = new GroupModel({ name, ownerId });
    const saved = await newGroup.save();

    // Add owner as a member of the group by default
    await new GroupMemberModel({
      groupId: saved._id,
      userId: ownerId
    }).save();

    return {
      _id: saved._id.toString(),
      name: saved.name,
      ownerId: saved.ownerId.toString()
    };
  }

  async findByUserId(userId: string): Promise<Group[]> {
    const memberGroups = await GroupMemberModel.find({ userId }).populate('groupId');
    return memberGroups.map((g: any) => ({
      _id: g.groupId._id.toString(),
      name: g.groupId.name,
      ownerId: g.groupId.ownerId.toString(),
      createdAt: g.groupId.createdAt
    }));
  }

  async findGroupById(groupId: string): Promise<Group | null> {
    const group = await GroupModel.findById(groupId);
    if (!group) return null;

    return {
      _id: group._id.toString(),
      name: group.name,
      ownerId: group.ownerId.toString()
    };
  }

  async addUserToGroup(groupId: string, userId: string): Promise<Group> {
    const group = await GroupModel.findById(groupId);
    if (!group) throw new Error('Group not found');

    const alreadyMember = await GroupMemberModel.findOne({ groupId, userId });
    if (alreadyMember) throw new Error('User already in group');

    await new GroupMemberModel({ groupId, userId }).save();

    return {
      _id: group._id.toString(),
      name: group.name,
      ownerId: group.ownerId.toString()
    };
  }
}
