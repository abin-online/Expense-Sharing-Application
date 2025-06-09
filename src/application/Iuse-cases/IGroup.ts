import { Group } from "../../domain/entities/Group";

export interface IGroupUseCase {
  createGroup(name: string, ownerId: string): Promise<Group>;
  listUserGroups(userId: string): Promise<Group[]>;
inviteUserToGroup(groupId: string, email: string, ownerId: string): Promise<string>;
  joinGroup(inviteToken: string, userId: string, email: string): Promise<Group>;
}