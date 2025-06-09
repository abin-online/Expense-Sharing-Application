import { Expense } from '../entities/Expense';

export interface IExpenseRepository {
  createExpense(expense: Partial<Expense>): Promise<Expense>;
  findByGroupId(groupId: string): Promise<Expense[]>;
}
