export interface SimulatorInputs {
  caAnnuel: number;
  nbClients: number;
  panierMoyen: number;
  frequence: number;
  budgetPct: number;
  rewardsAllocation: number;
}

export interface YearlyProjection {
  membres: number;
  tauxAdoption: number;
  panier: number;
  frequence: number;
  caClient: number;
  revenus: number;
  rewards: number;
  marketing: number;
  operational: number;
  capex: number;
  profit: number;
  roi: number;
  impactPanier: number;
  impactFreq: number;
  retention: number;
}

export interface SimulationResults {
  projections: YearlyProjection[];
  totalRevenus: number;
  roiMoyen: number;
  paybackMonths: number;
  successProba: number;
  riskLevel: string;
  capexAnnuel: number;
}
