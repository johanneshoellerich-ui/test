export type RiskProfile = 'conservative' | 'balanced' | 'growth' | 'aggressive';

export type AssetClass =
  | 'equities'
  | 'bonds'
  | 'realEstate'
  | 'commodities'
  | 'cash'
  | 'alternatives';

export interface AssetAllocation {
  equities: number;
  bonds: number;
  realEstate: number;
  commodities: number;
  cash: number;
  alternatives: number;
}

export interface Client {
  id: string;
  name: string;
  riskProfile: RiskProfile;
  portfolioValue: number;
  currentAllocation: AssetAllocation;
  targetAllocation: AssetAllocation;
  lastRebalanced: Date;
}

export interface RebalancingAction {
  assetClass: AssetClass;
  currentPercentage: number;
  targetPercentage: number;
  difference: number;
  action: 'buy' | 'sell' | 'hold';
  amount: number;
}

export interface RiskProfileDefinition {
  name: string;
  description: string;
  allocation: AssetAllocation;
  expectedReturn: number;
  volatility: number;
}
