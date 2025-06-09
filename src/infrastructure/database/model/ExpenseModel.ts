import mongoose, { Schema, Document } from 'mongoose';

export interface ExpenseDocument extends Document {
  groupId: mongoose.ObjectId;
  title: string;
  amount: number;
  date: Date;
  payerId: mongoose.ObjectId;
  participants: string[];
  sharePerUser: { [userId: string]: number };
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<ExpenseDocument>(
  {
    groupId: { type: Schema.Types.ObjectId, required: true, ref: 'Group' },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    payerId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    participants: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
    sharePerUser: { type: Map, of: Number, required: true }, // Map of userId to amount
  },
  {
    timestamps: true, 
  }
);

const ExpenseModel = mongoose.model<ExpenseDocument>('Expense', ExpenseSchema);

export default ExpenseModel;
