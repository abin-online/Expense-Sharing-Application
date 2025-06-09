import { ISettlementRepository } from '../../domain/repositories/ISettlementRepository';
import { Settlement } from '../../domain/entities/Settlement';
import SettlementModel from '../database/model/SettlementModel';

export class SettlementRepository implements ISettlementRepository {
    async createSettlement(settlement: Partial<Settlement>): Promise<Settlement> {
        const newSettlement = new SettlementModel({
            ...settlement,
            createdAt: new Date()
        });

        const saved = await newSettlement.save();
        return this.mapToSettlement(saved.toObject());
    }

    async findByGroupId(groupId: string): Promise<Settlement[]> {
        const settlements = await SettlementModel
            .find({ groupId })
            .sort({ date: -1 })
            .lean();

        return settlements.map(this.mapToSettlement);
    }

    private mapToSettlement = (data: any): Settlement => ({
        _id: data._id.toString(),
        groupId: data.groupId,
        payerId: data.payerId,
        payeeId: data.payeeId,
        amount: data.amount,
        date: new Date(data.date),
        createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
    });
}