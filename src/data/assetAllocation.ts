import { RiskProfile, RiskProfileDefinition, AssetAllocation } from '../types';

export const RISK_PROFILES: Record<RiskProfile, RiskProfileDefinition> = {
  conservative: {
    name: 'Konservativ',
    description: 'Niedriges Risiko, Fokus auf Kapitalerhalt und stabile Erträge',
    allocation: {
      equities: 20,
      bonds: 50,
      realEstate: 10,
      commodities: 5,
      cash: 10,
      alternatives: 5,
    },
    expectedReturn: 3.5,
    volatility: 5.0,
  },
  balanced: {
    name: 'Ausgewogen',
    description: 'Ausgewogenes Verhältnis zwischen Risiko und Rendite',
    allocation: {
      equities: 40,
      bonds: 35,
      realEstate: 12,
      commodities: 5,
      cash: 5,
      alternatives: 3,
    },
    expectedReturn: 5.5,
    volatility: 8.0,
  },
  growth: {
    name: 'Wachstumsorientiert',
    description: 'Höheres Risiko für langfristiges Wachstum',
    allocation: {
      equities: 60,
      bonds: 20,
      realEstate: 10,
      commodities: 5,
      cash: 2,
      alternatives: 3,
    },
    expectedReturn: 7.5,
    volatility: 12.0,
  },
  aggressive: {
    name: 'Aggressiv',
    description: 'Hohes Risiko, maximale Wachstumschancen',
    allocation: {
      equities: 75,
      bonds: 10,
      realEstate: 8,
      commodities: 3,
      cash: 1,
      alternatives: 3,
    },
    expectedReturn: 9.0,
    volatility: 16.0,
  },
};

export const ASSET_CLASS_NAMES: Record<keyof AssetAllocation, string> = {
  equities: 'Aktien',
  bonds: 'Anleihen',
  realEstate: 'Immobilien',
  commodities: 'Rohstoffe',
  cash: 'Cash',
  alternatives: 'Alternative Investments',
};

export const ASSET_CLASS_COLORS: Record<keyof AssetAllocation, string> = {
  equities: '#3b82f6',
  bonds: '#10b981',
  realEstate: '#f59e0b',
  commodities: '#ef4444',
  cash: '#6b7280',
  alternatives: '#8b5cf6',
};
