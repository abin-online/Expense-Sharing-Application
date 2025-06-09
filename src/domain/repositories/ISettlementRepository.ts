import { Settlement } from '../entities/Settlement';

export interface ISettlementRepository {
  createSettlement(settlement: Partial<Settlement>): Promise<Settlement>;
  findByGroupId(groupId: string): Promise<Settlement[]>;
}
