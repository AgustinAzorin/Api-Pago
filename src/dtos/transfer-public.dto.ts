export interface TransferPublicDTO {
  id: number;
  from_account_id: number;
  to_account_id: number;
  amount: number;
  created_at: Date;
  status: string;
}
