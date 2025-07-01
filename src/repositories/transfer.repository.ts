import { Transfer } from "../models/transfer.model";
import { Comprobante } from "../models/comprobante.model";

export class TransferRepository {
  async createTransfer(
    from_account_id: number,
    to_account_id: number,
    amount: number,
    status: string = "completed"
  ) {
    return await Transfer.create({
      from_account_id,
      to_account_id,
      amount,
      status,
    });
  }

  async findById(id: number) {
    return await Transfer.findByPk(id);
  }

  async findHistoryByAccount(account_id: number) {
    return await Transfer.findAll({
      where: {
        from_account_id: account_id,
      },
      order: [["created_at", "DESC"]],
    });
  }

  async findComprobanteByTransferId(transfer_id: number) {
    return await Comprobante.findOne({ where: { transfer_id } });
  }
}
