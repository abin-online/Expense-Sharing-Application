export interface Group {
  _id: string;
  name: string;
  ownerId: string;
}

export interface GroupMember {
  _id: string;
  groupId: string;
  userId: string;
  joinedAt: Date;
}