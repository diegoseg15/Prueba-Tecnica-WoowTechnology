import { UserRepository } from "../repositories/user.repository";

// Service Usuarios

export class UserService {
  private userRepository = new UserRepository();

  // Se obtiene el perfíl 
  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      const err: any = new Error("Usuario no encontrado");
      err.statusCode = 404;
      throw err;
    }

    return user;
  }

  // Se actualiza el nombre del usuario
  async updateProfile(userId: string, name: string) {
    const updatedUser = await this.userRepository.updateName(userId, name);

    if (!updatedUser) {
      const err: any = new Error("Usuario no encontrado");
      err.statusCode = 404;
      throw err;
    }

    return updatedUser;
  }

  // listado de todos los usuarios
  async getAllUsers(page: number, limit: number = 10) {
    const offset = (page - 1) * limit;

    const users = await this.userRepository.findAll(limit, offset);
    const total = await this.userRepository.countAll();

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
