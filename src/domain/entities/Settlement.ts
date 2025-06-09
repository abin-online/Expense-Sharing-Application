export interface Settlement {
  _id?: string;
  groupId: string;
  payerId: string;
  payeeId: string;
  amount: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
