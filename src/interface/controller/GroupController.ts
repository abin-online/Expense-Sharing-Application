import { Request, Response } from 'express';
import { IGroupUseCase } from '../../application/Iuse-cases/IGroup';

export class GroupController {
    constructor(
        private GroupUseCase: IGroupUseCase,
    ) { }

    createGroup = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;

            const ownerId = req.user?._id;

            if (!ownerId) {
                 res.status(401).json({ message: 'User not authenticated' });
                 return
            }


            const group = await this.GroupUseCase.createGroup(name, ownerId);
            res.status(201).json(group);
        } catch (err) {
            res.status(500).json({ message: 'Failed to create group' });
        }
    };

    listUserGroups = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const groups = await this.GroupUseCase.listUserGroups(userId);
            res.status(200).json(groups);
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch groups' });
        }
    };

      inviteUserToGroup = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const groupId = req.params.groupId;
      const ownerId = req.user?._id;

      if (!ownerId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const token = await this.GroupUseCase.inviteUserToGroup(groupId, email, ownerId);

      // You can send token via email later. For now, respond with it.
      res.status(200).json({
        message: 'Invite sent successfully',
        inviteToken: token
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to send invite' });
    }
  };

  // ✅ Join Group with Invite Token
  joinGroup = async (req: Request, res: Response) => {
    try {
      const { inviteToken } = req.body;
      const userId = req.user?._id;
      const userEmail = req.user?.email;

      if (!userId || !userEmail) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const group = await this.GroupUseCase.joinGroup(inviteToken, userId, userEmail);
      res.status(200).json({ message: 'Joined group successfully', group });
    } catch (err) {
      res.status(500).json({ message: 'Failed to join group' });
    }
  };

}