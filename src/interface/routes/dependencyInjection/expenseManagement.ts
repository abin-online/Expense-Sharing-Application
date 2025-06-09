import { ExpenseController } from '../../controller/ExpenseController';
import { ExpenseUseCase } from '../../../application/use-cases/Expense/ExpenseUseCase';
import { ExpenseRepository } from '../../../infrastructure/repositories/ExpenseRepository';
import { BalanceRepository } from '../../../infrastructure/repositories/BalanceRepository';

const expenseRepo = new ExpenseRepository();
const balanceRepo = new BalanceRepository();


const expenseUseCase = new ExpenseUseCase(expenseRepo, balanceRepo);

export const expenseController = new ExpenseController(expenseUseCase);
