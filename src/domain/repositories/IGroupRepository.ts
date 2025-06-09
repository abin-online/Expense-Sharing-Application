import { Group } from '../entities/Group';

export interface IGroupRepository {
  createGroup(name: string, ownerId: string): Promise<Group>;
  findByUserId(userId: string): Promise<Group[]>;
  findGroupById(groupId: string): Promise<Group | null>;
addUserToGroup(groupId: string, userId: string): Promise<Group>;

}
