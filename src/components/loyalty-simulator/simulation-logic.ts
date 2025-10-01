import { SimulatorInputs, SimulationResults, YearlyProjection } from './types';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

function calculateCapex(ca: number): number {
  const baseCAPEX = 20000;
  const additionalTranches = Math.floor(ca / 10000000);
  return baseCAPEX + (additionalTranches * 10000);
}

export function getRiskLevel(budgetPct: number): { level: string; class: string } {
  if (budgetPct <= 3) return { level: 'Low', class: 'risk-low' };
  if (budgetPct <= 6) return { level: 'Medium', class: 'risk-medium' };
  return { level: 'High', class: 'risk-high' };
}

function calculateSuccessProbability(budgetPct: number, rewardsAlloc: number): number {
  let probability = 63;

  if (budgetPct < 2) probability -= 10;
  else if (budgetPct >= 2 && budgetPct <= 4) probability += 12;
  else if (budgetPct > 4 && budgetPct <= 6) probability += 15;
  else probability += 8;

  if (rewardsAlloc >= 50 && rewardsAlloc <= 70) probability += 10;
  else if (rewardsAlloc < 50) probability += 5;
  else probability += 3;

  return Math.min(95, Math.max(40, probability));
}

function calculateImpacts(budgetPct: number, rewardsAlloc: number, year: number) {
  const rewardsWeight = rewardsAlloc / 100;
  const budgetMultiplier = Math.min(1.5, budgetPct / 4);
  const yearMultiplier = [0.5, 0.75, 1.0][year];

  const basketImpact = (10 + (rewardsWeight * 13)) * budgetMultiplier * yearMultiplier;
  const frequencyImpact = (8 + (rewardsWeight * 16)) * budgetMultiplier * yearMultiplier;

  const marketingWeight = 1 - rewardsWeight;
  const baseAdoption = 15;
  const adoptionImpact = baseAdoption + (marketingWeight * 10) + (budgetPct * 1.5);

  return {
    basket: basketImpact,
    frequency: frequencyImpact,
    adoption: Math.min(35, adoptionImpact * [0.8, 1.0, 1.1][year])
  };
}

export function runSimulation(inputs: SimulatorInputs): SimulationResults {
  const { caAnnuel, nbClients, panierMoyen, frequence, budgetPct, rewardsAllocation } = inputs;

  const capexAnnuel = calculateCapex(caAnnuel);
  const budgetProgramme = caAnnuel * (budgetPct / 100);

  const rewardsWeight = rewardsAllocation / 100;
  const budgetRewards = budgetProgramme * rewardsWeight;
  const budgetMarketing = budgetProgramme * (1 - rewardsWeight);
  const budgetOperational = budgetProgramme * 0.10;

  const successProba = calculateSuccessProbability(budgetPct, rewardsAllocation);
  const riskLevel = getRiskLevel(budgetPct).level;

  const projections: YearlyProjection[] = [];
  let totalRevenus = 0;
  let cumulativeProfit = 0;
  let paybackMonths = 0;

  for (let year = 0; year < 3; year++) {
    const impacts = calculateImpacts(budgetPct, rewardsAllocation, year);

    const tauxAdoption = impacts.adoption / 100;
    const membresActifs = Math.round(nbClients * tauxAdoption);

    const panierMoyenProg = panierMoyen * (1 + impacts.basket / 100);
    const frequenceProg = frequence * (1 + impacts.frequency / 100);
    const caClientProg = panierMoyenProg * frequenceProg;

    const caClientActuel = panierMoyen * frequence;
    const revenusIncr = membresActifs * (caClientProg - caClientActuel);

    const inflation = Math.pow(1.03, year);
    const coutsRewards = budgetRewards * inflation;
    const coutsMarketing = budgetMarketing * inflation;
    const coutsOp = budgetOperational * inflation;

    const totalCosts = coutsRewards + coutsMarketing + coutsOp + capexAnnuel;
    const profitNet = revenusIncr - totalCosts;
    const roi = (profitNet / totalCosts) * 100;

    const tauxRetention = 35 + (year * 7.5);

    projections.push({
      membres: membresActifs,
      tauxAdoption: tauxAdoption * 100,
      panier: panierMoyenProg,
      frequence: frequenceProg,
      caClient: caClientProg,
      revenus: revenusIncr,
      rewards: coutsRewards,
      marketing: coutsMarketing,
      operational: coutsOp,
      capex: capexAnnuel,
      profit: profitNet,
      roi: roi,
      impactPanier: impacts.basket,
      impactFreq: impacts.frequency,
      retention: tauxRetention
    });

    totalRevenus += revenusIncr;

    const monthlyProfit = profitNet / 12;
    for (let m = 0; m < 12; m++) {
      if (paybackMonths === 0) {
        cumulativeProfit += monthlyProfit;
        if (cumulativeProfit >= 0) {
          paybackMonths = (year * 12) + m + 1;
        }
      }
    }
  }

  if (paybackMonths === 0) paybackMonths = 36;

  const roiMoyen = projections.reduce((sum, p) => sum + p.roi, 0) / 3;

  return {
    projections,
    totalRevenus,
    roiMoyen,
    paybackMonths,
    successProba,
    riskLevel,
    capexAnnuel
  };
}
