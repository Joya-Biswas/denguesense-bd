import type { CHWReport } from '../types';

const chwNames = [
  'Fatima Khan', 'Mohammed Hassan', 'Nadia Begum', 'Rajib Hasan', 'Aisha Ahmed',
  'Karim Uddin', 'Shila Dey', 'Ismail Hossain', 'Rehana Akter', 'Nasir Ahmed',
  'Bidisha Roy', 'Tamim Khan', 'Rima Das', 'Saiful Islam', 'Priya Sharma',
  'Arif Hussain', 'Swati Sen', 'Faisal Ahmad', 'Deepika Gupta', 'Tariq Ali',
];

const wardNames = [
  'Mirpur-10', 'Jatrabari', 'Demra', 'Mohammadpur', 'Lalbagh', 'Hazaribagh',
  'Dhanmondi', 'Gulshan-1', 'Uttara-1', 'Motijheel',
];

const statuses: Array<'submitted' | 'pending' | 'overdue'> = ['submitted', 'pending', 'overdue'];

export const chwReports: CHWReport[] = Array.from({ length: 20 }, (_, i) => {
  const statusRand = Math.random();
  let status: 'submitted' | 'pending' | 'overdue' = 'submitted';
  if (statusRand > 0.78) status = 'overdue';
  else if (statusRand > 0.15) status = 'pending';

  return {
    id: `report-${i + 1}`,
    chwName: chwNames[i % chwNames.length],
    ward: wardNames[Math.floor(Math.random() * wardNames.length)],
    timestamp: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
    feverCases: Math.floor(Math.random() * 20) + 1,
    dengueSuspect: Math.floor(Math.random() * 8),
    status,
    alertTriggered: Math.random() > 0.7,
  };
});

export const chwSummary = {
  activeCHWs: 8400,
  reportsToday: 1247,
  avgFeverRate: 3.2,
  overdue: 89,
  submitted: 1078,
  pending: 170,
};
