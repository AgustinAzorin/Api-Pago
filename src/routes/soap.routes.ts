import { Router } from "express";
import { SoapController } from "../controllers/soap.controller";

const router = Router();

/**
 * @route POST /api/soap/validate-cuit
 * @desc Simula validación CUIT vía XML
 */
router.post("/validate-cuit", async (req, res, next) => {
  try {
    await SoapController.validateCuit(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
