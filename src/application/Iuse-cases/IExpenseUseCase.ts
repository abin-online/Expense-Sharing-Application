import { Expense } from '../../domain/entities/Expense';

export interface IExpenseUseCase {
  createExpense(
    groupId: string,
    title: string,
    amount: number,
    date: Date,
    payerId: string,
    participants: string[]
  ): Promise<Expense>;

  listExpenses(groupId: string): Promise<Expense[]>;
}
