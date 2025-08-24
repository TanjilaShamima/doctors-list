import { DASHBOARD_TEXT } from '@/@contents/dashboardText';
import { PROFILE_LABELS } from '@/@contents/profileFields';

// Create a simple translation object from @contents
const translations = {
  navigation: {
    home: "Overview",
    patients: "Patients", 
    schedule: "Schedule",
    message: "Message",
    transactions: "Transactions"
  },
  dashboard: {
    diagnosisHistoryTitle: DASHBOARD_TEXT.diagnosisHistoryTitle,
    diagnosisHistoryDescription: DASHBOARD_TEXT.diagnosisHistoryDescription,
    lastMonthsLabel: DASHBOARD_TEXT.lastMonthsLabel,
    bloodPressureLabel: DASHBOARD_TEXT.bloodPressureLabel,
    systolicLabel: DASHBOARD_TEXT.systolicLabel,
    diastolicLabel: DASHBOARD_TEXT.diastolicLabel
  },
  metrics: {
    respiratory: DASHBOARD_TEXT.metrics.respiratory,
    temperature: DASHBOARD_TEXT.metrics.temperature,
    heart: DASHBOARD_TEXT.metrics.heart
  },
  profile: {
    dateOfBirth: PROFILE_LABELS.dateOfBirth,
    gender: PROFILE_LABELS.gender,
    contact: PROFILE_LABELS.contact,
    emergency: PROFILE_LABELS.emergency,
    insurance: PROFILE_LABELS.insurance,
    showAll: PROFILE_LABELS.showAll
  },
  sidebar: {
    patients: "Patients",
    searchPlaceholder: "Search patients...",
    loading: "Loading...",
    noPatients: "No patients found."
  },
  doctor: {
    name: "Dr. Jose Simmons",
    title: "General Practitioner"
  },
  aria: {
    openSearch: "Open search",
    closeSearch: "Close search",
    searchPatients: "Search patients",
    settings: "Settings",
    more: "More options"
  },
  common: {
    search: "Search",
    close: "Close",
    loading: "Loading...",
    noData: "No data"
  },
  vitals: {
    status: {
      normal: "Normal",
      high: "High", 
      low: "Low",
      higherThanAverage: "Higher than Average",
      lowerThanAverage: "Lower than Average",
      noData: "No data"
    }
  },
  footer: {
    copyright: "© {{year}} Tech.Care"
  }
};

type NestedTranslationKeys<T> = T extends object 
  ? {
      [K in keyof T]: T[K] extends object 
        ? `${K & string}.${NestedTranslationKeys<T[K]> & string}`
        : K & string
    }[keyof T]
  : never;

export type FlattenedKeys = NestedTranslationKeys<typeof translations>;

export type Locale = 'en';

export function t(key: FlattenedKeys, locale: Locale = 'en', params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: unknown = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      console.warn(`Translation key not found: ${key} for locale: ${locale}`);
      return key;
    }
  }
  
  if (typeof value === 'string') {
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return paramKey in params ? String(params[paramKey]) : match;
      });
    }
    return value;
  }
  
  console.warn(`Translation value is not a string: ${key} for locale: ${locale}`);
  return key;
}

// Get current locale - for now just return 'en', but can be extended
export function getCurrentLocale(): Locale {
  return 'en';
}