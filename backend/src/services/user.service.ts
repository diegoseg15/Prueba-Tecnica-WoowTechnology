import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository = new UserRepository();

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      const err: any = new Error("Usuario no encontrado");
      err.statusCode = 404;
      throw err;
    }

    return user;
  }

  async updateProfile(userId: string, name: string) {
    const updatedUser = await this.userRepository.updateName(userId, name);

    if (!updatedUser) {
      const err: any = new Error("Usuario no encontrado");
      err.statusCode = 404;
      throw err;
    }

    return updatedUser;
  }
}
