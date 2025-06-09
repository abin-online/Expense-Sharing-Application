import { Balance } from "../../../domain/entities/Balance";
import { IBalanceRepository } from "../../../domain/repositories/IBalanceRepository";
import { IBalanceUseCase } from "../../Iuse-cases/BalanceUseCase";

export class BalanceUseCase implements IBalanceUseCase {
    constructor(private balanceRepo: IBalanceRepository) { }

    async getGroupBalances(groupId: string): Promise<Balance[]> {
        return this.balanceRepo.findByGroupId(groupId);
    }

    async listUserPendingSettlements(userId: string): Promise<Balance[]> {
  return this.balanceRepo.findUserBalances(userId);
}

}
