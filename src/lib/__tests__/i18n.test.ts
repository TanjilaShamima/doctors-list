import { t, getCurrentLocale, type FlattenedKeys } from '../i18n';

describe('i18n', () => {
  describe('t function', () => {
    it('returns translation for valid key', () => {
      expect(t('common.loading')).toBe('Loading...');
      expect(t('navigation.patients')).toBe('Patients');
    });

    it('returns key for invalid translation', () => {
      expect(t('invalid.key' as FlattenedKeys)).toBe('invalid.key');
    });

    it('handles parameter interpolation', () => {
      expect(t('footer.copyright', 'en', { year: 2024 })).toBe('© 2024 Tech.Care');
    });

    it('handles nested keys', () => {
      expect(t('dashboard.diagnosisHistoryTitle')).toBe('Diagnosis History');
      expect(t('vitals.status.normal')).toBe('Normal');
    });
  });

  describe('getCurrentLocale', () => {
    it('returns default locale', () => {
      expect(getCurrentLocale()).toBe('en');
    });
  });
});