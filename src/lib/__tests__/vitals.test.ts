import { deriveVitalStatuses } from '../../@utils/vitals';

describe('vitals utilities', () => {
  describe('deriveVitalStatuses', () => {
    it('returns correct status for normal values', () => {
      const result = deriveVitalStatuses(16, 98.5, 75);
      expect(result.respiratoryStatus).toBe('Normal');
      expect(result.tempStatus).toBe('Normal');
      expect(result.heartStatus).toBe('Normal');
    });

    it('returns high status for elevated values', () => {
      const result = deriveVitalStatuses(25, 101, 110);
      expect(result.respiratoryStatus).toBe('High');
      expect(result.tempStatus).toBe('High');
      expect(result.heartStatus).toBe('Higher than Average');
    });

    it('returns low status for reduced values', () => {
      const result = deriveVitalStatuses(10, 95, 50);
      expect(result.respiratoryStatus).toBe('Low');
      expect(result.tempStatus).toBe('Low');
      expect(result.heartStatus).toBe('Lower than Average');
    });

    it('handles null values', () => {
      const result = deriveVitalStatuses(null, null, null);
      expect(result.respiratoryStatus).toBe('No data');
      expect(result.tempStatus).toBe('No data');
      expect(result.heartStatus).toBe('No data');
    });
  });
});