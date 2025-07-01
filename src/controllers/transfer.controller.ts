import { Request, Response } from "express";
import { TransferService } from "../services/transfer.service";
import { CreateTransferDTO } from "../dtos/create-transfer.dto";

const transferService = new TransferService();

export class TransferController {
  static async createTransfer(req: Request, res: Response) {
    const dto: CreateTransferDTO = req.body;

    try {
      const transfer = await transferService.createTransfer(dto);
      res.status(201).json(transfer);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message || "Error al crear la transferencia." });
    }
  }

  static async getHistory(req: Request, res: Response) {
    const accountId = Number(req.params.id);

    if (isNaN(accountId)) {
      return res.status(400).json({ message: "ID de cuenta inválido." });
    }

    try {
      const history = await transferService.getHistory(accountId);
      res.json(history);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message || "Error al obtener el historial." });
    }
  }

  static async getComprobante(req: Request, res: Response) {
    const transferId = Number(req.params.id);

    if (isNaN(transferId)) {
      return res.status(400).json({ message: "ID de transferencia inválido." });
    }

    try {
      const comprobante = await transferService.getComprobante(transferId);
      res.json(comprobante);
    } catch (error: any) {
      console.error(error);
      res.status(404).json({ message: error.message || "Comprobante no encontrado." });
    }
  }
}
