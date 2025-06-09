import { Router } from "express";
import { groupController } from "./dependencyInjection/groupManagement";
import { authMiddleware } from "./dependencyInjection/authentication";


export const createGroupRoute = (): Router => {
    const router = Router();

router.post('/groups', authMiddleware.authenticate, groupController.createGroup);
router.get('/users/:userId/groups', groupController.listUserGroups);

    return router
}