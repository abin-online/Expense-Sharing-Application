import { Router } from 'express';
import { balanceController } from './dependencyInjection/balanceManagement';
import { authMiddleware } from './dependencyInjection/authentication';

export const balanceRoutes = (): Router => {
  const router = Router();

  router.get(
    '/groups/:groupId/balances',
    authMiddleware.authenticate,
    balanceController.listGroupBalances
  );

  router.get(
    '/users/:userId/pending-settlements',
    authMiddleware.authenticate,
    balanceController.listUserPendingSettlements
  );

  return router;
};
