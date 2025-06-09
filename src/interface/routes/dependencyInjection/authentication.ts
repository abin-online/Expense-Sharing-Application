import { UserAuthenticationUsecase } from "../../../application/use-cases/authentication/user-authentication";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { AuthService } from "../../../infrastructure/services/AuthService";
import { UserAuthController } from "../../controller/AuthController";
import { AuthMiddleware } from "../../middleware/authMiddleware";
import { ErrorMiddleware } from "../../middleware/errorMiddleware";
const userRepository = new UserRepository();
const authService = new AuthService();

const userAuthenticationUsecase = new UserAuthenticationUsecase(userRepository, authService);

export const userAuthController = new UserAuthController(userAuthenticationUsecase)

export const authMiddleware = new AuthMiddleware(authService, userRepository);
export const errorMiddleware = new ErrorMiddleware();