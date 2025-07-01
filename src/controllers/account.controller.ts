import { Request, Response } from "express";
import { AccountService } from "../services/account.service";

const accountService = new AccountService();

export class AccountController {
  static async getAccount(req: Request, res: Response) {
    const accountId = Number(req.params.id);

    if (isNaN(accountId)) {
      return res.status(400).json({ message: "ID de cuenta inválido." });
    }

    try {
      const account = await accountService.getAccount(accountId);
      res.json(account);
    } catch (error: any) {
      console.error(error);
      res.status(404).json({ message: error.message || "Cuenta no encontrada." });
    }
  }
}
