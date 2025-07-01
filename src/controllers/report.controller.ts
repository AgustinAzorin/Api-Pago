import { Request, Response } from "express";
import { ReportService } from "../services/report.service";
import { GenerateReportDTO } from "../dtos/generate-report.dto";

const reportService = new ReportService();

export class ReportController {
  static async generateReport(req: Request, res: Response) {
    const { account_id, from_date, to_date } = req.query;

    if (!account_id) {
      return res.status(400).json({ message: "account_id es requerido." });
    }

    const dto: GenerateReportDTO = {
      account_id: Number(account_id),
      from_date: from_date?.toString(),
      to_date: to_date?.toString(),
    };

    try {
      const report = await reportService.generateReport(dto);
      res.json(report);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message || "Error generando reporte." });
    }
  }
}
