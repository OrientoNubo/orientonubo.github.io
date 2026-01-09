// i18n Utility Functions

import { translations, type Language } from './translations';

// Default language
export const DEFAULT_LANGUAGE: Language = 'en';

// Get translations for a specific language
export function getTranslations(lang: Language) {
  return translations[lang] ?? translations[DEFAULT_LANGUAGE];
}

// Get localized field from an object (for CMS content with _zh suffix)
export function getLocalizedField<T>(
  item: Record<string, T>,
  field: string,
  lang: Language
): T {
  if (lang === 'zh-Hant' || lang === 'zh-Hans') {
    const zhField = `${field}_zh`;
    if (item[zhField] !== undefined && item[zhField] !== null && item[zhField] !== '') {
      return item[zhField];
    }
  }
  return item[field];
}

// Get language from cookie or localStorage (for client-side)
export function getLanguageFromStorage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('site-language');
    if (stored === 'en' || stored === 'zh-Hans' || stored === 'zh-Hant') {
      return stored;
    }
  }
  return DEFAULT_LANGUAGE;
}

// Set language in localStorage (for client-side)
export function setLanguageInStorage(lang: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('site-language', lang);
  }
}

// Get language for server-side (always returns default for static build)
// The actual language switching happens client-side via JavaScript
export function getLanguageFromCookies(_cookies?: unknown): Language {
  // For static builds, always return default language
  // Client-side JS will handle actual language detection
  return DEFAULT_LANGUAGE;
}
