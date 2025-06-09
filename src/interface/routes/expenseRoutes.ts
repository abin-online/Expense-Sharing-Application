
import { Router } from 'express';
import { expenseController } from './dependencyInjection/expenseManagement';
import { authMiddleware } from './dependencyInjection/authentication';

export const createExpenseRoute = (): Router => {
  const router = Router();

  router.post(
    '/groups/:groupId/expenses',
    authMiddleware.authenticate,
    expenseController.createExpense
  );

  router.get(
    '/groups/:groupId/expenses',
    authMiddleware.authenticate,
    expenseController.listExpenses
  );

  return router;
};
