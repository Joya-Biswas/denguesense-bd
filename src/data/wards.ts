import type { Ward } from '../types';

const wardNames = [
  'Mirpur-1', 'Mirpur-2', 'Mirpur-10', 'Mirpur-11', 'Mohammadpur', 'Dhanmondi',
  'Gulshan-1', 'Gulshan-2', 'Banani', 'Uttara-1', 'Uttara-2', 'Uttara-3',
  'Uttara-4', 'Uttara-5', 'Uttara-6', 'Motijheel', 'Paltan', 'Ramna',
  'Tejgaon', 'Farmgate', 'Karwan Bazar', 'Shyamoli', 'Rayer Bazar', 'Hazaribagh',
  'Lalbagh', 'Chawkbazar', 'Kotwali', 'Sutrapur', 'Gendaria', 'Jatrabari',
  'Demra', 'Shyampur', 'Kadamtali', 'Shahjahanpur', 'Khilgaon', 'Sabujbagh',
  'Rampura', 'Badda', 'Vatara', 'Khilkhet', 'Dakshinkhan', 'Uttarkhan',
  'Turag', 'Pallabi', 'Kafrul', 'Cantonment', 'Shah Ali', 'Rupnagar',
  'Adabor', 'Sher-E-Bangla Nagar', 'Ershad Nagar'
];

const criticalWards = ['Mirpur-10', 'Jatrabari', 'Demra', 'Mohammadpur', 'Lalbagh', 'Hazaribagh'];

function generateWard(name: string, index: number): Ward {
  const isCritical = criticalWards.includes(name);

  let riskScore: number;
  let riskLevel: 'critical' | 'high' | 'moderate' | 'low';

  if (isCritical) {
    riskScore = 80 + Math.floor(Math.random() * 21);
    riskLevel = 'critical';
  } else if (index < 18) {
    riskScore = 60 + Math.floor(Math.random() * 20);
    riskLevel = 'high';
  } else if (index < 36) {
    riskScore = 35 + Math.floor(Math.random() * 25);
    riskLevel = 'moderate';
  } else {
    riskScore = Math.floor(Math.random() * 35);
    riskLevel = 'low';
  }

  const trend = Math.random() > 0.6 ? 'rising' : Math.random() > 0.5 ? 'stable' : 'falling';
  const casesLastWeek = Math.floor(Math.random() * 100) + 20;
  const casesThisWeek = trend === 'rising'
    ? Math.floor(casesLastWeek * (1 + Math.random() * 0.3))
    : trend === 'falling'
    ? Math.floor(casesLastWeek * (0.7 + Math.random() * 0.2))
    : casesLastWeek + Math.floor((Math.random() - 0.5) * 20);

  return {
    id: `ward-${index + 1}`,
    name,
    riskScore,
    riskLevel,
    casesThisWeek: Math.floor(casesThisWeek),
    casesLastWeek,
    trend,
    sparkline: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
    weeklyHistory: Array.from({ length: 8 }, (_, i) => ({
      week: `W${-7 + i}`,
      cases: Math.floor(Math.random() * 120) + 20,
    })),
    factors: [
      { name: 'LST Anomaly', weight: Math.random() * 100, icon: 'thermometer' },
      { name: 'Rainfall', weight: Math.random() * 100, icon: 'cloud-rain' },
      { name: 'Population', weight: Math.random() * 100, icon: 'people' },
      { name: 'CHW Reports', weight: Math.random() * 100, icon: 'account-multiple' },
    ],
    confidence: 75 + Math.random() * 20,
    population: Math.floor(Math.random() * 500000) + 100000,
    chwCount: Math.floor(Math.random() * 150) + 50,
    lastFogging: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    coordinates: {
      lat: 23.8 + Math.random() * 0.3,
      lng: 90.3 + Math.random() * 0.4,
    },
  };
}

export const wards: Ward[] = wardNames.map((name, idx) => generateWard(name, idx));
