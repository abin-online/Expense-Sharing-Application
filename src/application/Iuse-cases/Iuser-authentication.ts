import { User } from "../../domain/entities/User";


export interface IUserAuthenticationUsecase {
    signup(user: string, email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: User;
    }>;
}