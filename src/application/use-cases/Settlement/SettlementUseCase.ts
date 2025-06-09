import { ISettlementUseCase } from '../../Iuse-cases/ISettlementUseCase';
import { ISettlementRepository } from '../../../domain/repositories/ISettlementRepository';
import { IBalanceRepository } from '../../../domain/repositories/IBalanceRepository';
import { Settlement } from '../../../domain/entities/Settlement';

export class SettlementUseCase implements ISettlementUseCase {
  constructor(
    private settlementRepo: ISettlementRepository,
    private balanceRepo: IBalanceRepository
  ) {}

  async createSettlement(
    groupId: string,
    payerId: string,
    payeeId: string,
    amount: number,
    date: Date
  ): Promise<Settlement> {
    // 1. Create the settlement record
    const settlement = await this.settlementRepo.createSettlement({
      groupId,
      payerId,
      payeeId,
      amount,
      date,
    });

    // 2. Update balances - adjust net balances for payer and payee
    await this.balanceRepo.updateBalancesAfterSettlement(
      groupId,
      payerId,
      payeeId,
      amount
    );

    return settlement;
  }

  async listSettlements(groupId: string): Promise<Settlement[]> {
    return this.settlementRepo.findByGroupId(groupId);
  }
}
