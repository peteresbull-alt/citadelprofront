export interface Signal {
  id: number;
  name: string;
  signal_type: string;
  price: string;
  signal_strength: string;
  action: string;
  risk_level: string;
  timeframe: string;
  status: string;
  is_featured: boolean;
  is_purchased: boolean;
  market_analysis: string;
  entry_point: string;
  target_price: string;
  stop_loss: string;
  technical_indicators: string;
  fundamental_analysis: string;
  created_at: string;
  expires_at: string | null;
}

export interface PurchasedSignal {
  id: number;
  signal: Signal;
  amount_paid: string;
  purchase_reference: string;
  purchased_at: string;
}