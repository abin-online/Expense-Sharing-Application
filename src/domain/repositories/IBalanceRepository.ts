import { Balance } from "../entities/Balance";

export interface IBalanceRepository {
    updateBalancesAfterExpense(
        groupId: string,
        payerId: string,
        participants: string[],
        share: number
    ): Promise<void>;

    updateBalancesAfterSettlement(
        groupId: string,
        payerId: string,
        payeeId: string,
        amount: number
    ): Promise<void>;

    findByGroupId(groupId: string): Promise<Balance[]>;

    findUserBalances(userId: string): Promise<Balance[]>;

}
