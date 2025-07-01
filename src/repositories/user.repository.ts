import { User } from "../models/user.model";

export class UserRepository {
  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async createUser(username: string, email: string, password_hash: string) {
    return await User.create({
      username,
      email,
      password_hash,
    });
  }
}
