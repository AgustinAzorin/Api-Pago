import { TransferRepository } from "../repositories/transfer.repository";
import { AccountRepository } from "../repositories/account.repository";
import { CreateTransferDTO } from "../dtos/create-transfer.dto";
import { TransferPublicDTO } from "../dtos/transfer-public.dto";
import { Transfer } from "../models/transfer.model";
import { sequelize } from "../config/database"; // importar la instancia


export class TransferService {
  private transferRepository: TransferRepository;
  private accountRepository: AccountRepository;

  private readonly MAX_TRANSFER_AMOUNT = Number(process.env.MAX_TRANSFER_AMOUNT) || 1_000_000;


  constructor() {
    this.transferRepository = new TransferRepository();
    this.accountRepository = new AccountRepository();
  }

  async createTransfer(dto: CreateTransferDTO): Promise<TransferPublicDTO> {
    const transaction = await sequelize.transaction(); // inicializar

    try {
      // validar cuentas dentro de la transacción
      const fromAccount = await this.accountRepository.findById(dto.from_account_id);
      if (!fromAccount) {
        throw new Error("La cuenta de origen no existe.");
      }

      const toAccount = await this.accountRepository.findById(dto.to_account_id);
      if (!toAccount) {
        throw new Error("La cuenta de destino no existe.");
      }

      if (dto.from_account_id === dto.to_account_id) {
        throw new Error("No se puede transferir a la misma cuenta.");
      }

      if (dto.amount <= 0) {
        throw new Error("El monto debe ser mayor a cero.");
      }

      if (dto.amount > this.MAX_TRANSFER_AMOUNT) {
        throw new Error(`No se pueden transferir más de $${this.MAX_TRANSFER_AMOUNT}.`);
      }

      if (Number(fromAccount.balance) < dto.amount) {
        throw new Error("Saldo insuficiente en la cuenta de origen.");
      }

      // ajustar saldos dentro de la transacción
      fromAccount.balance = Number(fromAccount.balance) - dto.amount;
      toAccount.balance = Number(toAccount.balance) + dto.amount;

      await fromAccount.save({ transaction });
      await toAccount.save({ transaction });

      // crear la transferencia
      const newTransfer = await this.transferRepository.createTransfer(
        dto.from_account_id,
        dto.to_account_id,
        dto.amount
      );

      // confirmar la transacción
      await transaction.commit();

      return {
        id: newTransfer.id,
        from_account_id: newTransfer.from_account_id,
        to_account_id: newTransfer.to_account_id,
        amount: Number(newTransfer.amount),
        created_at: newTransfer.created_at,
        status: newTransfer.status,
      };
    } catch (error) {
      await transaction.rollback();
      throw error; // relanzamos el error para que lo maneje el controller
    }
  }


  async getHistory(account_id: number): Promise<TransferPublicDTO[]> {
    const history: Transfer[] = await this.transferRepository.findHistoryByAccount(account_id);

    return history.map((t) => ({
      id: t.id,
      from_account_id: t.from_account_id,
      to_account_id: t.to_account_id,
      amount: Number(t.amount),
      created_at: t.created_at,
      status: t.status,
    }));
  }

  async getComprobante(transfer_id: number) {
    const comprobante = await this.transferRepository.findComprobanteByTransferId(transfer_id);

    if (!comprobante) {
      throw new Error("Comprobante no encontrado.");
    }

    return {
      id: comprobante.id,
      transfer_id: comprobante.transfer_id,
      comprobante_url: comprobante.comprobante_url,
      generated_at: comprobante.generated_at,
    };
  }
}
