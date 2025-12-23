export interface AdminWallet {
  id: number;
  currency: string;
  currency_display: string;
  amount: string;
  wallet_address: string;
  qr_code: string | null;
  qr_code_url: string | null;
  is_active: boolean;
}

export interface Transaction {
  id: number;
  reference: string;
  transaction_type: string;
  transaction_type_display: string;
  amount: string;
  currency: string;
  unit: string;
  status: string;
  status_display: string;
  created_at: string;
  receipt_url: string | null;
}

export interface DepositFormData {
  dollarAmount: string;
  currencyAmount: string;
}
