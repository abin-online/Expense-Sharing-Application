import { SettlementController } from '../../controller/SettlementController';
import { SettlementUseCase } from '../../../application/use-cases/Settlement/SettlementUseCase';
import { SettlementRepository } from '../../../infrastructure/repositories/SettlementRepository';
import { BalanceRepository } from '../../../infrastructure/repositories/BalanceRepository';

const settlementRepository = new SettlementRepository();
const balanceRepository = new BalanceRepository();

const settlementUseCase = new SettlementUseCase(settlementRepository, balanceRepository);

export const settlementController = new SettlementController(settlementUseCase);
