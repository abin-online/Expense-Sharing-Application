import { Settlement } from "../../domain/entities/Settlement";

export interface ISettlementUseCase {
  createSettlement(
    groupId: string,
    payerId: string,
    payeeId: string,
    amount: number,
    date: Date
  ): Promise<Settlement>;

  listSettlements(groupId: string): Promise<Settlement[]>;
}
