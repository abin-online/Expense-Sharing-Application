import { Request, Response } from 'express';
import { BalanceUseCase } from '../../application/use-cases/Balance/Balance';


export class BalanceController {
  constructor(private balanceUseCase: BalanceUseCase) {}

  listGroupBalances = async (req: Request, res: Response) => {
    try {
      const groupId = req.params.groupId;
      const balances = await this.balanceUseCase.getGroupBalances(groupId);
      res.status(200).json(balances);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch group balances' });
    }
  };

  listUserPendingSettlements = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const balances = await this.balanceUseCase.listUserPendingSettlements(userId);
    res.status(200).json(balances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user settlements' });
  }
};


}
