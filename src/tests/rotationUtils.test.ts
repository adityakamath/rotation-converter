import { 
  degreesToRadians, 
  radiansToDegrees, 
  normalizeVector, 
  triplePointsToMatrix,
  DECIMAL_PLACES
} from '@/utils/rotationUtils';

describe('rotationUtils', () => {
  describe('angle conversions', () => {
    test('converts degrees to radians', () => {
      expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
      expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
      expect(degreesToRadians(0)).toBe(0);
      expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI);
    });

    test('converts radians to degrees', () => {
      expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
      expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
      expect(radiansToDegrees(0)).toBe(0);
      expect(radiansToDegrees(2 * Math.PI)).toBeCloseTo(360);
    });

    test('conversion roundtrip preserves values', () => {
      const angles = [0, 45, 90, 180, 270, 360];
      angles.forEach(angle => {
        expect(radiansToDegrees(degreesToRadians(angle))).toBeCloseTo(angle);
      });
    });
  });

  describe('vector normalization', () => {
    test('normalizes non-zero vectors', () => {
      expect(normalizeVector([1, 0, 0])).toEqual([1, 0, 0]);
      expect(normalizeVector([2, 0, 0])).toEqual([1, 0, 0]);
      expect(normalizeVector([3, 4, 0])).toEqual([0.6, 0.8, 0]);
    });

    test('handles zero vectors', () => {
      expect(normalizeVector([0, 0, 0])).toEqual([0, 0, 0]);
    });

    test('produces unit vectors', () => {
      const vectors = [
        [1, 1, 1],
        [3, 4, 5],
        [-2, 3, -4]
      ];

      vectors.forEach(vector => {
        const normalized = normalizeVector(vector);
        const magnitude = Math.sqrt(normalized.reduce((sum, v) => sum + v * v, 0));
        expect(magnitude).toBeCloseTo(1);
      });
    });
  });

  describe('triplePointsToMatrix', () => {
    test('converts aligned points to identity matrix', () => {
      const points = {
        P: [0, 0, 0],
        Q: [1, 0, 0],
        R: [0, 0, 1]
      };
      const matrix = triplePointsToMatrix(points);
      expect(matrix).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ]);
    });

    test('handles scaled points', () => {
      const points = {
        P: [0, 0, 0],
        Q: [2, 0, 0],
        R: [0, 0, 2]
      };
      const matrix = triplePointsToMatrix(points);
      expect(matrix).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ]);
    });

    test('produces orthogonal matrix', () => {
      const points = {
        P: [1, 1, 1],
        Q: [2, 1, 1],
        R: [1, 1, 2]
      };
      const matrix = triplePointsToMatrix(points);
      
      // Check orthogonality: dot products should be 0
      const dotXY = matrix[0][0]*matrix[0][1] + matrix[1][0]*matrix[1][1] + matrix[2][0]*matrix[2][1];
      const dotXZ = matrix[0][0]*matrix[0][2] + matrix[1][0]*matrix[1][2] + matrix[2][0]*matrix[2][2];
      const dotYZ = matrix[0][1]*matrix[0][2] + matrix[1][1]*matrix[1][2] + matrix[2][1]*matrix[2][2];
      
      expect(dotXY).toBeCloseTo(0);
      expect(dotXZ).toBeCloseTo(0);
      expect(dotYZ).toBeCloseTo(0);
    });
  });
}); 