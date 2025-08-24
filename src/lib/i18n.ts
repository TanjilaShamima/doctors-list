import commonEn from '@/locales/en/common.json';

type NestedTranslationKeys<T> = T extends object 
  ? {
      [K in keyof T]: T[K] extends object 
        ? `${K & string}.${NestedTranslationKeys<T[K]> & string}`
        : K & string
    }[keyof T]
  : never;

type FlattenedKeys = NestedTranslationKeys<typeof commonEn>;

const translations = {
  en: commonEn,
};

export type Locale = keyof typeof translations;

export function t(key: FlattenedKeys, locale: Locale = 'en', params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: unknown = translations[locale];
  
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