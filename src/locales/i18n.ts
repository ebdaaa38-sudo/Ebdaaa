import enTranslations from './en.json';
import arTranslations from './ar.json';

export type Language = 'ar' | 'en';

export const translations = {
  ar: arTranslations,
  en: enTranslations,
};

export const getTranslation = (lang: Language, path: string, params?: Record<string, string | number>): string => {
  const keys = path.split('.');
  let current: any = translations[lang];

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      // Fallback to English if missing in current
      let fallback: any = translations['en'];
      for (const fKey of keys) {
        if (fallback && typeof fallback === 'object' && fKey in fallback) {
          fallback = fallback[fKey];
        } else {
          return path;
        }
      }
      return typeof fallback === 'string' ? fallback : path;
    }
  }

  if (typeof current !== 'string') {
    return path;
  }

  let result = current;
  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
    });
  }

  return result;
};
