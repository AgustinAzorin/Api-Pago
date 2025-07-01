import { AccountRepository } from "../repositories/account.repository";
import { AccountPublicDTO } from "../dtos/account-public.dto";

export class AccountService {
  private accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  async getAccount(id: number): Promise<AccountPublicDTO> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new Error("La cuenta no existe.");
    }

    return {
      id: account.id,
      user_id: account.user_id,
      balance: Number(account.balance),
      account_number: account.account_number,
    };
  }
}
