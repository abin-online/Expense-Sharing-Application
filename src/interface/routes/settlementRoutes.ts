import { Router } from 'express';
import { settlementController } from './dependencyInjection/settlementManagement';
import { authMiddleware } from './dependencyInjection/authentication';

export const createSettlementRoute = (): Router => {
  const router = Router();

  router.post(
    '/groups/:groupId/settlements',
    authMiddleware.authenticate,
    settlementController.createSettlement
  );

  router.get(
    '/groups/:groupId/settlements',
    authMiddleware.authenticate,
    settlementController.listSettlements
  );

  return router;
};
