import { Router } from "express";
import { TransferController } from "../controllers/transfer.controller";

const router = Router();

/**
 * @route POST /api/transfers
 */
router.post("/", async (req, res, next) => {
  try {
    await TransferController.createTransfer(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/transfers/history/:id
 */
router.get("/history/:id", async (req, res, next) => {
  try {
    await TransferController.getHistory(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/transfers/comprobante/:id
 */
router.get("/comprobante/:id", async (req, res, next) => {
  try {
    await TransferController.getComprobante(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
