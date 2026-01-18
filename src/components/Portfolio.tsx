import { User, TrendingUp, Target, PieChart } from 'lucide-react';
import { Client } from '../types';
import { RISK_PROFILES } from '../data/assetAllocation';
import {
  formatCurrency,
  formatPercentage,
  calculateDiversificationScore,
} from '../utils/calculations';
import { AllocationChart } from './AllocationChart';
import { RebalancingRecommendations } from './RebalancingRecommendations';

interface PortfolioProps {
  client: Client;
  rebalancingActions: any[];
  onBack: () => void;
}

export const Portfolio = ({ client, rebalancingActions, onBack }: PortfolioProps) => {
  const riskProfile = RISK_PROFILES[client.riskProfile];
  const diversificationScore = calculateDiversificationScore(client.currentAllocation);

  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <button onClick={onBack} className="back-button">
          ← Zurück
        </button>
        <div className="client-info">
          <User size={32} />
          <div>
            <h1>{client.name}</h1>
            <p className="client-meta">
              {riskProfile.name} Portfolio • {formatCurrency(client.portfolioValue)}
            </p>
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <TrendingUp size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-label">Erwartete Rendite</div>
            <div className="metric-value">{formatPercentage(riskProfile.expectedReturn)}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <Target size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-label">Volatilität</div>
            <div className="metric-value">{formatPercentage(riskProfile.volatility)}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <PieChart size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-label">Diversifikation</div>
            <div className="metric-value">{diversificationScore}/100</div>
          </div>
        </div>
      </div>

      <div className="portfolio-content">
        <div className="charts-section">
          <div className="chart-wrapper">
            <AllocationChart
              allocation={client.currentAllocation}
              title="Aktuelle Allokation"
            />
          </div>
          <div className="chart-wrapper">
            <AllocationChart
              allocation={client.targetAllocation}
              title="Ziel-Allokation"
            />
          </div>
        </div>

        <RebalancingRecommendations actions={rebalancingActions} />

        <div className="risk-profile-info">
          <h3>Risikoprofil: {riskProfile.name}</h3>
          <p>{riskProfile.description}</p>
          <div className="profile-details">
            <div className="detail">
              <span className="detail-label">Erwartete Rendite:</span>
              <span className="detail-value">
                {formatPercentage(riskProfile.expectedReturn)} p.a.
              </span>
            </div>
            <div className="detail">
              <span className="detail-label">Volatilität:</span>
              <span className="detail-value">
                {formatPercentage(riskProfile.volatility)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
