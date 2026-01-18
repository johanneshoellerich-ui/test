import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { RiskProfile, AssetAllocation } from '../types';
import { RISK_PROFILES } from '../data/assetAllocation';

interface ClientFormProps {
  onSubmit: (data: {
    name: string;
    riskProfile: RiskProfile;
    portfolioValue: number;
    currentAllocation: AssetAllocation;
  }) => void;
}

export const ClientForm = ({ onSubmit }: ClientFormProps) => {
  const [name, setName] = useState('');
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('balanced');
  const [portfolioValue, setPortfolioValue] = useState<number>(100000);
  const [currentAllocation, setCurrentAllocation] = useState<AssetAllocation>({
    equities: 30,
    bonds: 40,
    realEstate: 15,
    commodities: 5,
    cash: 8,
    alternatives: 2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      riskProfile,
      portfolioValue,
      currentAllocation,
    });
  };

  const handleAllocationChange = (key: keyof AssetAllocation, value: string) => {
    const numValue = parseFloat(value) || 0;
    setCurrentAllocation((prev) => ({
      ...prev,
      [key]: numValue,
    }));
  };

  const totalAllocation = Object.values(currentAllocation).reduce(
    (sum, val) => sum + val,
    0
  );

  return (
    <form onSubmit={handleSubmit} className="client-form">
      <div className="form-header">
        <UserPlus size={24} />
        <h2>Neuer Kunde</h2>
      </div>

      <div className="form-group">
        <label htmlFor="name">Kundenname</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Max Mustermann"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="riskProfile">Risikoprofil</label>
        <select
          id="riskProfile"
          value={riskProfile}
          onChange={(e) => setRiskProfile(e.target.value as RiskProfile)}
        >
          {Object.entries(RISK_PROFILES).map(([key, profile]) => (
            <option key={key} value={key}>
              {profile.name} - {profile.description}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="portfolioValue">Portfolio-Wert (EUR)</label>
        <input
          id="portfolioValue"
          type="number"
          value={portfolioValue}
          onChange={(e) => setPortfolioValue(parseFloat(e.target.value) || 0)}
          min="0"
          step="1000"
          required
        />
      </div>

      <div className="form-section">
        <h3>Aktuelle Allokation (%)</h3>
        <div className="allocation-inputs">
          <div className="form-group">
            <label htmlFor="equities">Aktien</label>
            <input
              id="equities"
              type="number"
              value={currentAllocation.equities}
              onChange={(e) => handleAllocationChange('equities', e.target.value)}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bonds">Anleihen</label>
            <input
              id="bonds"
              type="number"
              value={currentAllocation.bonds}
              onChange={(e) => handleAllocationChange('bonds', e.target.value)}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="realEstate">Immobilien</label>
            <input
              id="realEstate"
              type="number"
              value={currentAllocation.realEstate}
              onChange={(e) => handleAllocationChange('realEstate', e.target.value)}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="commodities">Rohstoffe</label>
            <input
              id="commodities"
              type="number"
              value={currentAllocation.commodities}
              onChange={(e) => handleAllocationChange('commodities', e.target.value)}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cash">Cash</label>
            <input
              id="cash"
              type="number"
              value={currentAllocation.cash}
              onChange={(e) => handleAllocationChange('cash', e.target.value)}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="alternatives">Alternative Investments</label>
            <input
              id="alternatives"
              type="number"
              value={currentAllocation.alternatives}
              onChange={(e) => handleAllocationChange('alternatives', e.target.value)}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>
        <div className={`total-allocation ${totalAllocation !== 100 ? 'invalid' : ''}`}>
          Gesamt: {totalAllocation.toFixed(1)}%
          {totalAllocation !== 100 && ' (muss 100% sein)'}
        </div>
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={totalAllocation !== 100 || !name}
      >
        Portfolio analysieren
      </button>
    </form>
  );
};
