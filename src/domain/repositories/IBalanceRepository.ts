export interface IBalanceRepository {
  updateBalancesAfterExpense(
    groupId: string,
    payerId: string,
    participants: string[],
    share: number
  ): Promise<void>;

  // maybe more methods like getBalance, settleBalance, etc.
}
