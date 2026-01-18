import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { Client, AssetAllocation, RiskProfile } from './types';
import { RISK_PROFILES } from './data/assetAllocation';
import { calculateRebalancingActions } from './utils/calculations';
import { ClientForm } from './components/ClientForm';
import { Portfolio } from './components/Portfolio';

function App() {
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  const handleClientSubmit = (data: {
    name: string;
    riskProfile: RiskProfile;
    portfolioValue: number;
    currentAllocation: AssetAllocation;
  }) => {
    const targetAllocation = RISK_PROFILES[data.riskProfile].allocation;

    const client: Client = {
      id: Date.now().toString(),
      name: data.name,
      riskProfile: data.riskProfile,
      portfolioValue: data.portfolioValue,
      currentAllocation: data.currentAllocation,
      targetAllocation,
      lastRebalanced: new Date(),
    };

    setCurrentClient(client);
  };

  const handleBack = () => {
    setCurrentClient(null);
  };

  if (currentClient) {
    const rebalancingActions = calculateRebalancingActions(
      currentClient.currentAllocation,
      currentClient.targetAllocation,
      currentClient.portfolioValue
    );

    return (
      <Portfolio
        client={currentClient}
        rebalancingActions={rebalancingActions}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <BarChart3 size={32} />
          <h1>SAA Private Banking</h1>
        </div>
        <p className="subtitle">Strategic Asset Allocation Tool</p>
      </header>

      <main className="main-content">
        <div className="welcome-section">
          <h2>Willkommen</h2>
          <p>
            Analysieren Sie Kundenportfolios und erhalten Sie präzise Empfehlungen für die
            optimale Asset Allocation basierend auf individuellen Risikoprofilen.
          </p>
        </div>

        <ClientForm onSubmit={handleClientSubmit} />
      </main>
    </div>
  );
}

export default App;
