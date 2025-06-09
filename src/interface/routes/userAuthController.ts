import { Router } from "express";
import { userAuthController } from "./dependencyInjection/authentication";
import { authMiddleware } from "./dependencyInjection/authentication";


export const createuserAuthRoute = (): Router => {
    const router = Router();

    router.post('/user/signup', userAuthController.signup);
    router.post('/user/login', userAuthController.login);

    return router
}