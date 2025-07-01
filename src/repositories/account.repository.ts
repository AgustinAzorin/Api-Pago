import { Account } from "../models/account.model";

export class AccountRepository {
  async findById(id: number) {
    return await Account.findByPk(id);
  }
}
