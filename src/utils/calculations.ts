import {
  AssetAllocation,
  AssetClass,
  RebalancingAction,
} from '../types';

export const calculateTotalAllocation = (allocation: AssetAllocation): number => {
  return Object.values(allocation).reduce((sum, value) => sum + value, 0);
};

export const calculateRebalancingActions = (
  currentAllocation: AssetAllocation,
  targetAllocation: AssetAllocation,
  portfolioValue: number,
  threshold: number = 5
): RebalancingAction[] => {
  const actions: RebalancingAction[] = [];
  const assetClasses = Object.keys(currentAllocation) as AssetClass[];

  assetClasses.forEach((assetClass) => {
    const current = currentAllocation[assetClass];
    const target = targetAllocation[assetClass];
    const difference = current - target;
    const absDifference = Math.abs(difference);

    let action: 'buy' | 'sell' | 'hold' = 'hold';
    if (absDifference > threshold) {
      action = difference > 0 ? 'sell' : 'buy';
    }

    const amount = (absDifference / 100) * portfolioValue;

    actions.push({
      assetClass,
      currentPercentage: current,
      targetPercentage: target,
      difference,
      action,
      amount,
    });
  });

  return actions.sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference));
};

export const calculatePortfolioMetrics = (
  allocation: AssetAllocation,
  portfolioValue: number
) => {
  const total = calculateTotalAllocation(allocation);
  const normalized = total === 100;

  const assetValues: Record<AssetClass, number> = {
    equities: (allocation.equities / 100) * portfolioValue,
    bonds: (allocation.bonds / 100) * portfolioValue,
    realEstate: (allocation.realEstate / 100) * portfolioValue,
    commodities: (allocation.commodities / 100) * portfolioValue,
    cash: (allocation.cash / 100) * portfolioValue,
    alternatives: (allocation.alternatives / 100) * portfolioValue,
  };

  return {
    total,
    normalized,
    assetValues,
  };
};

export const calculateDiversificationScore = (
  allocation: AssetAllocation
): number => {
  const values = Object.values(allocation).filter((v) => v > 0);
  if (values.length === 0) return 0;

  const sum = values.reduce((a, b) => a + b, 0);
  const hhi = values.reduce((acc, val) => {
    const share = val / sum;
    return acc + share * share;
  }, 0);

  const maxClasses = 6;
  const normalizedHHI = (1 - hhi) / (1 - 1 / maxClasses);

  return Math.round(normalizedHHI * 100);
};

export const formatCurrency = (value: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(value);
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};
