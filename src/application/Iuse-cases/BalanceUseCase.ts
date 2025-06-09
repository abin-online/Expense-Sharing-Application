import { Balance } from "../../domain/entities/Balance";

export interface IBalanceUseCase {
    getGroupBalances(groupId: string): Promise<Balance[]>
    listUserPendingSettlements(userId: string): Promise<Balance[]>
}