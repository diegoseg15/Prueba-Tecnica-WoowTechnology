import { RegisterDTO } from "../models/regsiter.dto";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";

export class AuthService {
  private userRepository = new UserRepository();

  async register(data: RegisterDTO) {
    const existUser = await this.userRepository.findByEmail(data.email);

    if (existUser) {
      throw new Error("El correo ya se encuentra resgistrado");
    }

    const hashedPass = await bcrypt.hash(data.password, 10);

    const newUser = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPass,
      role: "user",
    });

    return newUser;
  }
}
