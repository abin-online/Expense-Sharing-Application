import { Request, Response } from 'express';
import { ExpenseUseCase } from '../../application/use-cases/Expense/ExpenseUseCase';

export class ExpenseController {
  constructor(private expenseUseCase: ExpenseUseCase) {}

  createExpense = async (req: Request, res: Response) => {
    try {
      const groupId = req.params.groupId;
      const { title, amount, date, payerId, participants } = req.body;

      if (!title || !amount || !date || !payerId || !participants) {
         res.status(400).json({ message: 'Missing required fields' });
         return
      }

      const expense = await this.expenseUseCase.createExpense(
        groupId,
        title,
        amount,
        new Date(date),
        payerId,
        participants
      );

      res.status(201).json(expense);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create expense' });
    }
  };

  listExpenses = async (req: Request, res: Response) => {
    try {
      const groupId = req.params.groupId;
      const expenses = await this.expenseUseCase.listExpenses(groupId);
      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch expenses' });
    }
  };
}
