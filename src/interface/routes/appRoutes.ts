import { Router } from 'express';
import { createuserAuthRoute } from './userAuthController';

const router = Router();

router.use('/auth', createuserAuthRoute());

export default router;
