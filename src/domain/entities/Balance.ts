export interface Balance {
  _id?: string;
  groupId: string;
  userId: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}
