import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { RebalancingAction } from '../types';
import { ASSET_CLASS_NAMES } from '../data/assetAllocation';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface RebalancingRecommendationsProps {
  actions: RebalancingAction[];
}

export const RebalancingRecommendations = ({
  actions,
}: RebalancingRecommendationsProps) => {
  const significantActions = actions.filter((action) => action.action !== 'hold');

  if (significantActions.length === 0) {
    return (
      <div className="recommendations">
        <h3>Rebalancing-Empfehlungen</h3>
        <div className="success-message">
          <Minus size={20} />
          <p>Ihr Portfolio ist optimal ausgerichtet. Kein Rebalancing erforderlich.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations">
      <h3>Rebalancing-Empfehlungen</h3>
      <p className="recommendations-intro">
        Die folgenden Anpassungen werden empfohlen, um Ihre Zielallokation zu erreichen:
      </p>
      <div className="actions-list">
        {significantActions.map((action) => (
          <div key={action.assetClass} className={`action-item ${action.action}`}>
            <div className="action-header">
              {action.action === 'buy' ? (
                <TrendingUp size={20} className="icon-buy" />
              ) : (
                <TrendingDown size={20} className="icon-sell" />
              )}
              <h4>{ASSET_CLASS_NAMES[action.assetClass]}</h4>
            </div>
            <div className="action-details">
              <div className="detail-row">
                <span>Aktuell:</span>
                <span className="value">{formatPercentage(action.currentPercentage)}</span>
              </div>
              <div className="detail-row">
                <span>Ziel:</span>
                <span className="value">{formatPercentage(action.targetPercentage)}</span>
              </div>
              <div className="detail-row">
                <span>Differenz:</span>
                <span className={`value ${action.action}`}>
                  {formatPercentage(Math.abs(action.difference))}
                </span>
              </div>
              <div className="detail-row action-row">
                <span className="action-label">
                  {action.action === 'buy' ? 'Kaufen' : 'Verkaufen'}:
                </span>
                <span className="amount">{formatCurrency(action.amount)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
