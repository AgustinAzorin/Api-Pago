import { Router } from "express";
import { AccountController } from "../controllers/account.controller";

const router = Router();

/**
 * @route GET /api/accounts/:id
 * @desc Obtiene los datos de la cuenta
 */
router.get("/:id", async (req, res, next) => {
  try {
    await AccountController.getAccount(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
