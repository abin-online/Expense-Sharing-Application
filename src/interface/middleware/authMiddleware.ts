import { Request, Response, NextFunction } from 'express';
import { IAuthService } from '../../domain/IServices/IAuthService';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export class AuthMiddleware {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository
  ) { }

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      const refreshToken = req.headers['x-refresh-token'] as string;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Access token required', success: false });
        return;
      }

      const accessToken = authHeader.split(' ')[1];
      let decoded = this.authService.verifyToken(accessToken);

      if (!decoded && refreshToken) {
        decoded = this.authService.verifyRefreshToken(refreshToken);

        if (decoded) {
          const newTokens = this.authService.generateTokens(decoded.userId, decoded.role);
          res.setHeader('Authorization', `Bearer ${newTokens.accessToken}`);
        } else {
          res.status(401).json({ message: 'Session expired. Please login again.', success: false });
          return;
        }
      }

      if (!decoded) {
        res.status(401).json({ message: 'Invalid or expired token', success: false });
        return;
      }


      const user = await this.userRepository.findById(decoded.userId);
      if (!user) {
        res.status(401).json({ message: 'User not found', success: false });
        return;
      }

      // Assign user  to req
      req.user = user;

      next();
    } catch (error) {
      console.error('Auth error:', error);
      res.status(500).json({ message: 'Authentication failed', success: false });
      return;
    }
  };
}
