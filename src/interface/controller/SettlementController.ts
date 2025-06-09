import { Request, Response } from 'express';
import { SettlementUseCase } from '../../application/use-cases/Settlement/SettlementUseCase';

export class SettlementController {
  constructor(private settlementUseCase: SettlementUseCase) {}

  createSettlement = async (req: Request, res: Response) => {
    try {
      const groupId = req.params.groupId;
      const { payerId, payeeId, amount, date } = req.body;

      if (!payerId || !payeeId || !amount || !date) {
         res.status(400).json({ message: 'Missing required fields' });
         return
      }

      const settlement = await this.settlementUseCase.createSettlement(
        groupId,
        payerId,
        payeeId,
        amount,
        new Date(date)
      );

      res.status(201).json(settlement);
    } catch (error) {
      console.error('Failed to create settlement:', error);
      res.status(500).json({ message: 'Failed to create settlement' });
    }
  };

  listSettlements = async (req: Request, res: Response) => {
    try {
      const groupId = req.params.groupId;
      const settlements = await this.settlementUseCase.listSettlements(groupId);
      res.status(200).json(settlements);
    } catch (error) {
      console.error('Failed to fetch settlements:', error);
      res.status(500).json({ message: 'Failed to fetch settlements' });
    }
  };
}
