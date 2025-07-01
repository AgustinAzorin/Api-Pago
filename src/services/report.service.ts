import { TransferRepository } from "../repositories/transfer.repository";
import { GenerateReportDTO } from "../dtos/generate-report.dto";
import { TransferPublicDTO } from "../dtos/transfer-public.dto";
import { Transfer } from "../models/transfer.model";

export class ReportService {
  private transferRepository: TransferRepository;

  constructor() {
    this.transferRepository = new TransferRepository();
  }

  async generateReport(dto: GenerateReportDTO): Promise<TransferPublicDTO[]> {
    const history: Transfer[] = await this.transferRepository.findHistoryByAccount(
      dto.account_id
    );

    // si hay filtro de fechas, lo aplicamos
    const filtered = history.filter((t) => {
      const date = new Date(t.created_at);
      const from = dto.from_date ? new Date(dto.from_date) : null;
      const to = dto.to_date ? new Date(dto.to_date) : null;

      if (from && date < from) return false;
      if (to && date > to) return false;

      return true;
    });

    return filtered.map((t) => ({
      id: t.id,
      from_account_id: t.from_account_id,
      to_account_id: t.to_account_id,
      amount: Number(t.amount),
      created_at: t.created_at,
      status: t.status,
    }));
  }
}
