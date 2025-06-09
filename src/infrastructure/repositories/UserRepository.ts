import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserModel } from '../database/model/UserModel';

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const userDoc = await UserModel.findById(id);
    if (!userDoc) return null;

    return this.toDomain(userDoc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;

    return this.toDomain(userDoc);
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash
    });

    const savedUser = await newUser.save();

    return this.toDomain(savedUser);
  }

  private toDomain(userDoc: any): User {
    return {
      _id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      passwordHash: userDoc.passwordHash,
    };
  }
}
