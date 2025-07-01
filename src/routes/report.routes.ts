import { Router } from "express";
import { ReportController } from "../controllers/report.controller";

const router = Router();

/**
 * @route GET /api/reports
 * @desc Genera un reporte de movimientos
 */
router.get("/", async (req, res, next) => {
  try {
    await ReportController.generateReport(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
