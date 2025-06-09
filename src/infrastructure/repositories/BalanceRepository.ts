import { Balance } from '../../domain/entities/Balance';
import { IBalanceRepository } from '../../domain/repositories/IBalanceRepository';
import BalanceModel from '../database/model/BalanceModel';

export class BalanceRepository implements IBalanceRepository {
    async updateBalancesAfterExpense(
        groupId: string,
        payerId: string,
        participants: string[],
        share: number
    ): Promise<void> {
 

        for (const participant of participants) {
            if (participant !== payerId) {
                await BalanceModel.updateOne(
                    { groupId, userId: participant },
                    { $inc: { balance: -share } },
                    { upsert: true }
                );
            }
        }


        const totalOwedToPayer = share * (participants.length - 1);
        await BalanceModel.updateOne(
            { groupId, userId: payerId },
            { $inc: { balance: totalOwedToPayer } },
            { upsert: true }
        );
    }


    async updateBalancesAfterSettlement(
        groupId: string,
        payerId: string,
        payeeId: string,
        amount: number
    ): Promise<void> {

        // - Decrease payer's balance (they gave money)
        // - Increase payee's balance (they received money)

        await BalanceModel.updateOne(
            { groupId, userId: payerId },
            { $inc: { balance: -amount } },
            { upsert: true }
        );

        await BalanceModel.updateOne(
            { groupId, userId: payeeId },
            { $inc: { balance: amount } },
            { upsert: true }
        );
    }

  async findByGroupId(groupId: string): Promise<Balance[]> {
    const records = await BalanceModel.find({ groupId }).lean();
    return records.map(this.mapToBalance);
  }

  async findUserBalances(userId: string): Promise<Balance[]> {

    const userRecord = await BalanceModel.find({ userId }).lean();
      return userRecord.map(this.mapToBalance);
 
}


  private mapToBalance(record: any): Balance {
    return {
      _id: record._id?.toString(),
      groupId: record.groupId,
      userId: record.userId,
      balance: record.balance,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }
}

