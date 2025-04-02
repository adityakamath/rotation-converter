import {
  eulerToQuaternion,
  quaternionToEuler,
  quaternionToMatrix,
  matrixToQuaternion,
  axisAngleToQuaternion,
  quaternionToAxisAngle,
  isValidQuaternion,
  isValidMatrix,
  isValidAxisAngle,
  convertRotation
} from '@/lib/math/conversions';
import { EulerAngles, Quaternion, Matrix3x3, AxisAngle } from '@/types/rotations';

describe('Rotation Conversions', () => {
  const EPSILON = 0.001; // Tolerance for floating point comparisons

  // Helper function to compare floating point numbers
  const expectNear = (a: number, b: number) => {
    expect(Math.abs(a - b)).toBeLessThan(EPSILON);
  };

  // Helper function to compare quaternions
  const compareQuaternions = (a: Quaternion, b: Quaternion) => {
    // Account for q and -q representing the same rotation
    const sign = Math.sign(a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z);
    if (sign < 0) {
      b = { w: -b.w, x: -b.x, y: -b.y, z: -b.z };
    }
    expectNear(a.w, b.w);
    expectNear(a.x, b.x);
    expectNear(a.y, b.y);
    expectNear(a.z, b.z);
  };

  describe('Euler Angles Conversions', () => {
    test('converts Euler angles to quaternion and back', () => {
      const euler: EulerAngles = { x: 0.1, y: 0.2, z: 0.3 };
      const quaternion = eulerToQuaternion(euler);
      const result = quaternionToEuler(quaternion);

      expectNear(euler.x, result.x);
      expectNear(euler.y, result.y);
      expectNear(euler.z, result.z);
    });

    test('handles zero rotation', () => {
      const euler: EulerAngles = { x: 0, y: 0, z: 0 };
      const quaternion = eulerToQuaternion(euler);
      expect(isValidQuaternion(quaternion)).toBe(true);
      expectNear(quaternion.w, 1);
      expectNear(quaternion.x, 0);
      expectNear(quaternion.y, 0);
      expectNear(quaternion.z, 0);
    });
  });

  describe('Quaternion Conversions', () => {
    test('converts quaternion to matrix and back', () => {
      const quaternion: Quaternion = { w: 1, x: 0, y: 0, z: 0 };
      const matrix = quaternionToMatrix(quaternion);
      const result = matrixToQuaternion(matrix);
      compareQuaternions(quaternion, result);
    });

    test('validates unit quaternion', () => {
      const validQuaternion: Quaternion = { w: 1, x: 0, y: 0, z: 0 };
      const invalidQuaternion: Quaternion = { w: 2, x: 0, y: 0, z: 0 };
      
      expect(isValidQuaternion(validQuaternion)).toBe(true);
      expect(isValidQuaternion(invalidQuaternion)).toBe(false);
    });
  });

  describe('Axis-Angle Conversions', () => {
    test('converts axis-angle to quaternion and back', () => {
      const axisAngle: AxisAngle = {
        axis: { x: 1, y: 0, z: 0 },
        angle: Math.PI / 2
      };
      const quaternion = axisAngleToQuaternion(axisAngle);
      const result = quaternionToAxisAngle(quaternion);

      expectNear(axisAngle.angle, result.angle);
      expectNear(axisAngle.axis.x, result.axis.x);
      expectNear(axisAngle.axis.y, result.axis.y);
      expectNear(axisAngle.axis.z, result.axis.z);
    });

    test('handles zero rotation', () => {
      const axisAngle: AxisAngle = {
        axis: { x: 1, y: 0, z: 0 },
        angle: 0
      };
      const quaternion = axisAngleToQuaternion(axisAngle);
      expect(isValidQuaternion(quaternion)).toBe(true);
      expectNear(quaternion.w, 1);
      expectNear(quaternion.x, 0);
      expectNear(quaternion.y, 0);
      expectNear(quaternion.z, 0);
    });
  });

  describe('Matrix Conversions', () => {
    test('validates rotation matrix', () => {
      const identity: Matrix3x3 = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ];
      const invalid: Matrix3x3 = [
        [2, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ];

      expect(isValidMatrix(identity)).toBe(true);
      expect(isValidMatrix(invalid)).toBe(false);
    });
  });

  describe('Conversion Hub', () => {
    test('converts between all formats', () => {
      const euler: EulerAngles = { x: 0.1, y: 0.2, z: 0.3 };
      
      // Convert to all formats
      const quaternion = convertRotation(euler, 'euler', 'quaternion') as Quaternion;
      const matrix = convertRotation(quaternion, 'quaternion', 'matrix') as Matrix3x3;
      const axisAngle = convertRotation(matrix, 'matrix', 'axisAngle') as AxisAngle;
      
      // Convert back to euler
      const resultEuler = convertRotation(axisAngle, 'axisAngle', 'euler') as EulerAngles;

      // Compare initial and final euler angles
      expectNear(euler.x, resultEuler.x);
      expectNear(euler.y, resultEuler.y);
      expectNear(euler.z, resultEuler.z);
    });

    test('handles invalid format gracefully', () => {
      const euler: EulerAngles = { x: 0.1, y: 0.2, z: 0.3 };
      expect(() => {
        // @ts-ignore - Testing runtime error
        convertRotation(euler, 'invalid', 'quaternion');
      }).toThrow('Unsupported input format: invalid');
    });
  });
}); 