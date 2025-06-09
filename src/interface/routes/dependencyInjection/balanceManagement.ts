import { BalanceRepository } from '../../../infrastructure/repositories/BalanceRepository';
import { BalanceUseCase } from '../../../application/use-cases/Balance/Balance';
import { BalanceController } from '../../controller/BalanceController';

const balanceRepo = new BalanceRepository();
const balanceUseCase = new BalanceUseCase(balanceRepo);
export const balanceController = new BalanceController(balanceUseCase);
