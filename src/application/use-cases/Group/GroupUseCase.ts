import { IGroupRepository } from "../../../domain/repositories/IGroupRepository";
import { IGroupUseCase } from "../../Iuse-cases/IGroup";

import jwt from 'jsonwebtoken';
import { Group } from "../../../domain/entities/Group";


const INVITE_SECRET = process.env.INVITE_SECRET || 'invite-secret-key';

export class GroupUseCase implements IGroupUseCase {
  constructor(private readonly groupRepo: IGroupRepository) {} 

  async createGroup(name: string, ownerId: string) {
    return await this.groupRepo.createGroup(name, ownerId);
  }

  async listUserGroups(userId: string) {
    return await this.groupRepo.findByUserId(userId);
  }

   async inviteUserToGroup(groupId: string, email: string, ownerId: string): Promise<string> {

    const group = await this.groupRepo.findGroupById(groupId);
    if (!group) throw new Error("Group not found");
    if (group.ownerId  !== ownerId) throw new Error("Unauthorized");

    const token = jwt.sign({ groupId, email }, INVITE_SECRET, { expiresIn: '2d' });
    return token;
  }

  async joinGroup(inviteToken: string, userId: string, email: string): Promise<Group> {
    try {
      const decoded = jwt.verify(inviteToken, INVITE_SECRET) as { groupId: string; email: string };

      if (decoded.email !== email) {
        throw new Error("Invite email mismatch");
      }

      const group = await this.groupRepo.addUserToGroup(decoded.groupId, userId);
      return group;
    } catch (err) {
      throw new Error("Invalid or expired invite token");
    }
  }

}
