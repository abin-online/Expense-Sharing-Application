import mongoose, { Schema, Document } from 'mongoose';

export interface IBalance extends Document {
  groupId: string;
  userId: string;
  balance: number;  // positive means others owe this user, negative means user owes others
  createdAt: Date;
  updatedAt: Date;
}

const BalanceSchema = new Schema<IBalance>(
  {
    groupId: {
      type: String,
      required: true,
      index: true,  // faster queries by group
    },
    userId: {
      type: String,
      required: true,
      index: true,  // faster queries by user
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

BalanceSchema.index({ groupId: 1, userId: 1 }, { unique: true }); // unique combo to avoid duplicates

const BalanceModel = mongoose.model<IBalance>('Balance', BalanceSchema);

export default BalanceModel;
