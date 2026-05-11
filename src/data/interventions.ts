import type { Intervention } from '../types';

const wards = [
  'Mirpur-10', 'Jatrabari', 'Demra', 'Mohammadpur', 'Lalbagh', 'Hazaribagh',
  'Dhanmondi', 'Gulshan-1', 'Uttara-1', 'Motijheel', 'Kamlapur', 'Rampura',
];

const teams = [
  'Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta', 'Team Epsilon',
];

const types: Array<'fogging' | 'larvicide' | 'awareness'> = [
  'fogging', 'fogging', 'fogging', 'fogging', 'fogging', 'fogging', 'fogging', 'fogging',
  'larvicide', 'larvicide', 'larvicide', 'awareness',
];

const statuses: Array<'scheduled' | 'in_progress' | 'completed'> = [
  'scheduled', 'scheduled', 'scheduled', 'in_progress', 'in_progress', 'completed', 'completed', 'completed',
  'completed', 'completed', 'completed', 'completed',
];

export const interventions: Intervention[] = Array.from({ length: 12 }, (_, i) => ({
  id: `intervention-${i + 1}`,
  ward: wards[i % wards.length],
  date: new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toISOString().split('T')[0],
  type: types[i],
  status: statuses[i],
  areaCovered: Math.floor(Math.random() * 5) + 1,
  coveragePercent: Math.floor(Math.random() * 100) + 20,
  team: teams[i % teams.length],
  costBDT: Math.floor(Math.random() * 200000) + 50000,
  casesAvertedEst: Math.floor(Math.random() * 50) + 10,
}));

export const interventionsSummary = {
  thisMonth: 12,
  totalCost: 482000,
  avgCostPerWard: 10200,
  casesAvertedEst: 340,
};

export const interventionCoverage = {
  fogging: 68,
  larvicide: 45,
  awareness: 82,
};
