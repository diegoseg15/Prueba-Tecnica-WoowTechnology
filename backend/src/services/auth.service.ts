import { signToken } from "../config/jwt";
import { LoginDTO } from "../models/login.dto";
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

  async login(data: LoginDTO) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      const error: any = new Error("Las credenciales son invalidas");
      error.status = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      const error: any = new Error("Las credenciales son invalidas");
      error.status = 401;
      throw error;
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return { user: safeUser, token };
  }
}
