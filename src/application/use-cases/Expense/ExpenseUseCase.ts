import { IExpenseRepository } from '../../../domain/repositories/IExpenseRepository';
import { IBalanceRepository } from '../../../domain/repositories/IBalanceRepository';
import { Expense } from '../../../domain/entities/Expense';
import { IExpenseUseCase } from "../../Iuse-cases/IExpenseUseCase";

export class ExpenseUseCase implements IExpenseUseCase {
    constructor(
        private expenseRepo: IExpenseRepository,
        private balanceRepo: IBalanceRepository
    ) { }

    // Calculate shares evenly and update balances
    async createExpense(
        groupId: string,
        title: string,
        amount: number,
        date: Date,
        payerId: string,
        participants: string[]
    ): Promise<Expense> {

        if (!participants.includes(payerId)) {
            participants.push(payerId); // Ensure payer is in participants
        }

        const share = amount / participants.length;
        const sharePerUser: { [userId: string]: number } = {};
        participants.forEach(userId => {
            sharePerUser[userId] = share;
        });

        // Create expense
        const expense = await this.expenseRepo.createExpense({
            groupId,
            title,
            amount,
            date,
            payerId,
            participants,
            sharePerUser,
        });

        // Update net balances
        await this.balanceRepo.updateBalancesAfterExpense(
            groupId,
            payerId,
            participants,
            share
        );

        return expense;
    }

    async listExpenses(groupId: string): Promise<Expense[]> {
        return this.expenseRepo.findByGroupId(groupId);
    }
}
