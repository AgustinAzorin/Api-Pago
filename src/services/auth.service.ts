import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginDTO } from "../dtos/login.dto";
import { RegisterDTO } from "../dtos/register.dto";
import { UserPublicDTO } from "../dtos/user-public.dto";
import { UserRepository } from "../repositories/user.repository";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(dto: RegisterDTO): Promise<UserPublicDTO> {
    // verificar existencia
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error("El email ya está registrado.");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userRepository.createUser(
      dto.username,
      dto.email,
      hashedPassword
    );

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at,
    };
  }

  async login(dto: LoginDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error("Credenciales incorrectas.");
    }

    const valid = await bcrypt.compare(dto.password, user.password_hash);
    if (!valid) {
      throw new Error("Credenciales incorrectas.");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return token;
  }
}
