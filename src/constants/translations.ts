export type LanguageCode = 'en' | 'bn';

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // App
    appName: 'DengueSense BD',

    // Tab labels
    riskMap: 'Risk Map',
    forecast: 'Forecast',
    alerts: 'Alerts',
    reports: 'Reports',
    more: 'More',

    // Risk Map
    dhaka: 'Dhaka',
    chattogram: 'Chattogram',
    sylhet: 'Sylhet',
    monitored: 'Monitored',
    critical: 'Critical',
    high: 'High',
    moderate: 'Moderate',
    low: 'Low',
    auroc: 'AUROC',

    // Metrics
    casesThisWeek: 'Cases This Week',
    casesLastWeek: 'Cases Last Week',
    population: 'Population',
    activeCHWs: 'Active CHWs',
    riskScore: 'Risk Score',
    confidence: 'Confidence',

    // Trends
    rising: 'Rising',
    stable: 'Stable',
    falling: 'Falling',
    trend: 'Trend',

    // Forecast
    aiForcastEngine: 'AI Forecast Engine',
    monsoonSeason2026: 'Monsoon Season 2026',
    day7: '7 Day',
    day14: '14 Day',
    day21: '21 Day',
    runNewForecast: 'Run New Forecast',
    modelPerformance: 'Model Performance',
    sensitivity: 'Sensitivity',
    specificity: 'Specificity',
    f1Score: 'F1 Score',

    // Alerts
    alertCentre: 'Alert Centre',
    active: 'Active',
    responseRate: 'Response Rate',
    avgResponse: 'Avg Response',
    filterAll: 'All',
    filterPending: 'Pending',
    filterAcknowledged: 'Acknowledged',
    filterDeployed: 'Deployed',
    filterResolved: 'Resolved',
    acknowledge: 'Acknowledge',
    deployVectorControl: 'Deploy Vector Control',

    // CHW Reports
    chwReports: 'CHW Reports',
    reportToday: 'Reports Today',
    avgFeverRate: 'Avg Fever Rate',
    overdue: 'Overdue',
    fever: 'Fever',
    dengue: 'Dengue',
    submitted: 'Submitted',
    pending: 'Pending',
    simulateNewReport: 'Simulate New Report',

    // More menu
    satelliteData: 'Satellite Data',
    interventionTracker: 'Intervention Tracker',
    analyticsReports: 'Analytics & Reports',
    settings: 'Settings',

    // Satellite
    lstHeatmap: 'LST Heatmap',
    rainfallChart: 'Rainfall Chart',
    waterBodyIndex: 'Water Body Index',
    ndvi: 'NDVI',
    export: 'Export',
    live: 'Live',

    // Interventions
    costSummary: 'Cost Summary',
    opsThisMonth: 'Ops This Month',
    totalCost: 'Total Cost',
    avgCostPerWard: 'Avg Cost/Ward',
    casesAvertedEst: 'Cases Averted Est',
    fogging: 'Fogging',
    larvicide: 'Larvicide',
    awareness: 'Awareness',
    scheduleOperation: 'Schedule Operation',
    selectWard: 'Select Ward',
    selectType: 'Select Type',
    selectDate: 'Select Date',
    selectTeam: 'Select Team',
    confirm: 'Confirm',

    // Analytics
    seasonComparison: 'Season Comparison',
    contributionCalendar: 'Contribution Calendar',
    cityComparison: 'City Comparison',
    demographicDonut: 'Demographic Donut',
    modelDriftMonitor: 'Model Drift Monitor',
    retrainThreshold: 'Retrain Threshold',
    generateReport: 'Generate Report',
    reportSaved: 'Report saved to device',

    // Settings
    dataSources: 'Data Sources',
    alertThresholds: 'Alert Thresholds',
    modelManagement: 'Model Management',
    triggerRetraining: 'Trigger Retraining',
    notifications: 'Notifications',
    sms: 'SMS',
    pushNotifications: 'Push Notifications',
    email: 'Email',
    language: 'Language',
    systemHealth: 'System Health',
    runHealthCheck: 'Run Health Check',
    english: 'English',
    bengali: 'বাংলা',

    // Status badges
    ward: 'Ward',
    officer: 'Officer',
    date: 'Date',
    type: 'Type',
    status: 'Status',
    issued: 'Issued',
    responseHours: 'Response Hours',

    // Buttons
    triggerAlert: 'Trigger Alert',
    scheduleForgging: 'Schedule Fogging',
    cancel: 'Cancel',
    ok: 'OK',
    retry: 'Retry',

    // Messages
    somethingWentWrong: 'Something went wrong',
    noData: 'No data available',
    loading: 'Loading...',
  },
  bn: {
    // App
    appName: 'ডেঙ্গুসেন্স বিডি',

    // Tab labels
    riskMap: 'ঝুঁকি মানচিত্র',
    forecast: 'পূর্বাভাস',
    alerts: 'সতর্কতা',
    reports: 'প্রতিবেদন',
    more: 'আরও',

    // Risk Map
    dhaka: 'ঢাকা',
    chattogram: 'চট্টগ্রাম',
    sylhet: 'সিলেট',
    monitored: 'পর্যবেক্ষিত',
    critical: 'সংকটপূর্ণ',
    high: 'উচ্চ',
    moderate: 'মধ্যম',
    low: 'নিম্ন',
    auroc: 'এওরক',

    // Metrics
    casesThisWeek: 'এই সপ্তাহের কেস',
    casesLastWeek: 'গত সপ্তাহের কেস',
    population: 'জনসংখ্যা',
    activeCHWs: 'সক্রিয় সিএইচডাব্লু',
    riskScore: 'ঝুঁকি স্কোর',
    confidence: 'আত্মবিশ্বাস',

    // Trends
    rising: 'বৃদ্ধি',
    stable: 'স্থিতিশীল',
    falling: 'হ্রাস',
    trend: 'প্রবণতা',

    // Forecast
    aiForcastEngine: 'এআই পূর্বাভাস ইঞ্জিন',
    monsoonSeason2026: 'বর্ষা মৌসুম ২০২৬',
    day7: '৭ দিন',
    day14: '১৪ দিন',
    day21: '২১ দিন',
    runNewForecast: 'নতুন পূর্বাভাস চালান',
    modelPerformance: 'মডেল পারফরম্যান্স',
    sensitivity: 'সংবেদনশীলতা',
    specificity: 'নির্দিষ্টতা',
    f1Score: 'F1 স্কোর',

    // Alerts
    alertCentre: 'সতর্কতা কেন্দ্র',
    active: 'সক্রিয়',
    responseRate: 'প্রতিক্রিয়া হার',
    avgResponse: 'গড় প্রতিক্রিয়া',
    filterAll: 'সব',
    filterPending: 'অপেক্ষমান',
    filterAcknowledged: 'স্বীকৃত',
    filterDeployed: 'স্থাপন করা',
    filterResolved: 'সমাধান করা',
    acknowledge: 'স্বীকার করুন',
    deployVectorControl: 'ভেক্টর নিয়ন্ত্রণ স্থাপন করুন',

    // CHW Reports
    chwReports: 'সিএইচডাব্লু প্রতিবেদন',
    reportToday: 'আজ প্রতিবেদন',
    avgFeverRate: 'গড় জ্বরের হার',
    overdue: 'বকেয়া',
    fever: 'জ্বর',
    dengue: 'ডেঙ্গু',
    submitted: 'জমা দেওয়া',
    pending: 'অপেক্ষমান',
    simulateNewReport: 'নতুন প্রতিবেদন সিমুলেট করুন',

    // More menu
    satelliteData: 'উপগ্রহ ডেটা',
    interventionTracker: 'হস্তক্ষেপ ট্র্যাকার',
    analyticsReports: 'বিশ্লেষণ ও প্রতিবেদন',
    settings: 'সেটিংস',

    // Satellite
    lstHeatmap: 'এলএসটি হিটম্যাপ',
    rainfallChart: 'বৃষ্টিপাত চার্ট',
    waterBodyIndex: 'জলাশয় সূচক',
    ndvi: 'এনডিভিআই',
    export: 'রপ্তানি করুন',
    live: 'লাইভ',

    // Interventions
    costSummary: 'খরচ সারাংশ',
    opsThisMonth: 'এই মাসের অপস',
    totalCost: 'মোট খরচ',
    avgCostPerWard: 'ওয়ার্ড প্রতি গড় খরচ',
    casesAvertedEst: 'কেস এভার্টেড এস্ট',
    fogging: 'ধোঁয়াটে',
    larvicide: 'লার্ভিসাইড',
    awareness: 'সচেতনতা',
    scheduleOperation: 'অপারেশন নির্ধারণ করুন',
    selectWard: 'ওয়ার্ড নির্বাচন করুন',
    selectType: 'ধরন নির্বাচন করুন',
    selectDate: 'তারিখ নির্বাচন করুন',
    selectTeam: 'দল নির্বাচন করুন',
    confirm: 'নিশ্চিত করুন',

    // Analytics
    seasonComparison: 'মৌসুম তুলনা',
    contributionCalendar: 'অবদান ক্যালেন্ডার',
    cityComparison: 'শহর তুলনা',
    demographicDonut: 'জনতাত্ত্বিক ডোনাট',
    modelDriftMonitor: 'মডেল ড্রিফ্ট মনিটর',
    retrainThreshold: 'পুনরায় প্রশিক্ষণ থ্রেশহোল্ড',
    generateReport: 'প্রতিবেদন তৈরি করুন',
    reportSaved: 'ডিভাইসে প্রতিবেদন সংরক্ষিত',

    // Settings
    dataSources: 'ডেটা উৎস',
    alertThresholds: 'সতর্কতা থ্রেশহোল্ড',
    modelManagement: 'মডেল ব্যবস্থাপনা',
    triggerRetraining: 'পুনরায় প্রশিক্ষণ চালান',
    notifications: 'বিজ্ঞপ্তি',
    sms: 'এসএমএস',
    pushNotifications: 'পুশ বিজ্ঞপ্তি',
    email: 'ইমেল',
    language: 'ভাষা',
    systemHealth: 'সিস্টেম স্বাস্থ্য',
    runHealthCheck: 'স্বাস্থ্য পরীক্ষা চালান',
    english: 'English',
    bengali: 'বাংলা',

    // Status badges
    ward: 'ওয়ার্ড',
    officer: 'অফিসার',
    date: 'তারিখ',
    type: 'ধরন',
    status: 'অবস্থা',
    issued: 'জারি করা',
    responseHours: 'প্রতিক্রিয়া ঘন্টা',

    // Buttons
    triggerAlert: 'সতর্কতা সক্রিয় করুন',
    scheduleForgging: 'ধোঁয়াটে নির্ধারণ করুন',
    cancel: 'বাতিল করুন',
    ok: 'ঠিক আছে',
    retry: 'পুনরায় চেষ্টা করুন',

    // Messages
    somethingWentWrong: 'কিছু ভুল হয়েছে',
    noData: 'কোন ডেটা পাওয়া যায় না',
    loading: 'লোডিং...',
  },
};
