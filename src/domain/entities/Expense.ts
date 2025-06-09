export interface Expense {
  _id?: string;
  groupId: string;
  title: string;
  amount: number;
  date: Date;
  payerId: string;
  participants: string[]; 
  sharePerUser: { [userId: string]: number }; // share calculation
  createdAt?: Date;
}
