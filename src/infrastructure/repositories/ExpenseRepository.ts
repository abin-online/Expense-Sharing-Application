import { IExpenseRepository } from '../../domain/repositories/IExpenseRepository';
import { Expense } from '../../domain/entities/Expense';
import ExpenseModel from '../database/model/ExpenseModel';

export class ExpenseRepository implements IExpenseRepository {
  async createExpense(expense: Partial<Expense>): Promise<Expense> {
    const newExpense = new ExpenseModel({
      ...expense,
      createdAt: new Date(),
    });

    const savedExpense = await newExpense.save();
    return this.toDomain(savedExpense);
  }

  async findByGroupId(groupId: string): Promise<Expense[]> {
    const expenses = await ExpenseModel.find({ groupId }).sort({ date: -1 }).lean();
    return expenses.map(exp => this.toDomain(exp));
  }


  private toDomain(expenseDoc: any): Expense {
    return {
      _id: expenseDoc._id.toString(),
      groupId: expenseDoc.groupId,
      title: expenseDoc.title,
      amount: expenseDoc.amount,
      date: expenseDoc.date,
      payerId: expenseDoc.payerId,
      participants: expenseDoc.participants,
      sharePerUser: expenseDoc.sharePerUser,
      createdAt: expenseDoc.createdAt,
    };
}
}
