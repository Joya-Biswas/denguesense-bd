import type { Alert } from '../types';

const officerNames = [
  'Dr. Karim Hassan', 'Dr. Noor Akhter', 'Mr. Faisal Khan', 'Ms. Ritu Sharma',
  'Dr. Amina Begum', 'Mr. Rajesh Kumar', 'Dr. Saida Ahmed', 'Mr. Tariq Nasir',
];

const wards = [
  'Mirpur-10', 'Jatrabari', 'Demra', 'Mohammadpur', 'Lalbagh', 'Hazaribagh',
  'Dhanmondi', 'Gulshan-1', 'Uttara-1', 'Motijheel', 'Kamlapur', 'Rampura',
  'Badda', 'Banani', 'Khilkhet', 'Uttara-4',
];

const triggerReasons = [
  'LST +2.8°C anomaly · CHW fever spike 380%',
  'Rainfall surge 150mm · NDVI decline 12%',
  'Consecutive fever reports x 5 · Population density high',
  'Temperature spike · Water body index elevation',
  'CHW alert threshold exceeded · Spatial cluster detected',
  'Forecast confidence breach · Historical pattern match',
  'Multi-factor convergence · Risk score > 80',
  'Unusual case acceleration · Model uncertainty',
  'Satellite LST anomaly + rainfall surge',
  'CHW reports surge + historical high-risk pattern',
];

const statuses: Array<'pending' | 'acknowledged' | 'deployed' | 'resolved'> = [
  'pending',
  'pending',
  'acknowledged',
  'acknowledged',
  'deployed',
  'deployed',
  'deployed',
  'resolved',
  'resolved',
  'resolved',
];

export const alerts: Alert[] = Array.from({ length: 15 }, (_, i) => {
  const status = statuses[i % statuses.length];
  const responseHours = status === 'pending' ? null : Math.floor(Math.random() * 8) + 1;

  return {
    id: `alert-${i + 1}`,
    wardName: wards[Math.floor(Math.random() * wards.length)],
    severity: i < 3 ? 'critical' : i < 8 ? 'high' : 'moderate',
    triggerReason: triggerReasons[Math.floor(Math.random() * triggerReasons.length)],
    issuedAt: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
    status,
    officer: officerNames[Math.floor(Math.random() * officerNames.length)],
    responseHours,
    predictedCaseIncrease: Math.floor(Math.random() * 80) + 10,
  };
});

export const alertsSummary = {
  active: 15,
  responseRate: 73,
  avgResponseHours: 4.2,
};
