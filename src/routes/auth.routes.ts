import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

/**
 * @route POST /api/login
 * @desc Inicia sesión
 */
router.post("/login", AuthController.login);

/**
 * @route POST /api/register
 * @desc Registra un nuevo usuario
 */
router.post("/register", AuthController.register);

export default router;
