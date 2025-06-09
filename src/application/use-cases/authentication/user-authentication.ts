import { IUserAuthenticationUsecase } from '../../Iuse-cases/Iuser-authentication';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IAuthService } from '../../../domain/IServices/IAuthService';
import { User } from '../../../domain/entities/User';

export class UserAuthenticationUsecase implements IUserAuthenticationUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService
  ) {}

  async signup(user: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const passwordHash = await this.authService.hashPassword(password);

    const newUser = await this.userRepository.createUser({
      name : user,
      email,
      passwordHash
    });

    return newUser;
  }

  async login(email: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await this.authService.comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const { accessToken, refreshToken } = this.authService.generateTokens(user._id.toString(), 'user');

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
