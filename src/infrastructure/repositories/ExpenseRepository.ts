import { IExpenseRepository } from '../../domain/IRepositories/IExpenseRepository';
import { Expense } from '../../domain/entities/Expense';
import ExpenseModel from '../models/ExpenseModel';

export class ExpenseRepository implements IExpenseRepository {
  async createExpense(expense: Partial<Expense>): Promise<Expense> {
    const newExpense = new ExpenseModel({
      ...expense,
      createdAt: new Date(),
    });

    const savedExpense = await newExpense.save();
    return savedExpense.toObject();
  }

  async findByGroupId(groupId: string): Promise<Expense[]> {
    return ExpenseModel.find({ groupId }).sort({ date: -1 }).lean();
  }
}
