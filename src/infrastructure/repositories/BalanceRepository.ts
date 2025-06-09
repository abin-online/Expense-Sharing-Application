import { IBalanceRepository } from '../../domain/repositories/IBalanceRepository';
import BalanceModel from '../database/model/BalanceModel';

export class BalanceRepository implements IBalanceRepository {
    async updateBalancesAfterExpense(
        groupId: string,
        payerId: string,
        participants: string[],
        share: number
    ): Promise<void> {
        // Logic to update balances in DB
        // For example:
        // 1. Increase payer’s balance by total amount (share * participants count - payer’s own share)
        // 2. Decrease each participant’s balance by their share

        // This is just pseudocode, you have to implement actual logic based on your schema

        for (const participant of participants) {
            if (participant !== payerId) {
                // Reduce balance of participant
                await BalanceModel.updateOne(
                    { groupId, userId: participant },
                    { $inc: { balance: -share } },
                    { upsert: true }
                );
            }
        }

        // Increase balance of payer by total shares owed by others
        const totalOwedToPayer = share * (participants.length - 1);
        await BalanceModel.updateOne(
            { groupId, userId: payerId },
            { $inc: { balance: totalOwedToPayer } },
            { upsert: true }
        );
    }
}

