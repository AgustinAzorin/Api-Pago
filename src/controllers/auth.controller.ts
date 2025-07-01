import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginDTO } from "../dtos/login.dto";
import { RegisterDTO } from "../dtos/register.dto";

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    const dto: RegisterDTO = req.body;

    try {
      const user = await authService.register(dto);
      res.status(201).json(user);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message || "Error en el registro." });
    }
  }

  static async login(req: Request, res: Response) {
    const dto: LoginDTO = req.body;

    try {
      const token = await authService.login(dto);
      res.status(200).json({ token });
    } catch (error: any) {
      console.error(error);
      res.status(401).json({ message: error.message || "Error en el login." });
    }
  }
}
