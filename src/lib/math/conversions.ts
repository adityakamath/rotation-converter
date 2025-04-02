import { EulerAngles, Quaternion, Matrix3x3, AxisAngle } from '@/types/rotations';

// Helper functions
const normalizeVector = (x: number, y: number, z: number): [number, number, number] => {
  const length = Math.sqrt(x * x + y * y + z * z);
  return length === 0 ? [0, 0, 0] : [x / length, y / length, z / length];
};

// Euler to Quaternion (ZYX order)
export function eulerToQuaternion(euler: EulerAngles): Quaternion {
  const { x, y, z } = euler;
  const c1 = Math.cos(x / 2);
  const s1 = Math.sin(x / 2);
  const c2 = Math.cos(y / 2);
  const s2 = Math.sin(y / 2);
  const c3 = Math.cos(z / 2);
  const s3 = Math.sin(z / 2);

  return {
    w: c1 * c2 * c3 - s1 * s2 * s3,
    x: s1 * c2 * c3 + c1 * s2 * s3,
    y: c1 * s2 * c3 - s1 * c2 * s3,
    z: c1 * c2 * s3 + s1 * s2 * c3
  };
}

// Quaternion to Euler (ZYX order)
export function quaternionToEuler(q: Quaternion): EulerAngles {
  const { x, y, z, w } = q;
  
  // Roll (x-axis rotation)
  const sinr_cosp = 2 * (w * x + y * z);
  const cosr_cosp = 1 - 2 * (x * x + y * y);
  const roll = Math.atan2(sinr_cosp, cosr_cosp);

  // Pitch (y-axis rotation)
  const sinp = 2 * (w * y - z * x);
  const pitch = Math.abs(sinp) >= 1 
    ? Math.PI / 2 * Math.sign(sinp) // Use 90 degrees if out of range
    : Math.asin(sinp);

  // Yaw (z-axis rotation)
  const siny_cosp = 2 * (w * z + x * y);
  const cosy_cosp = 1 - 2 * (y * y + z * z);
  const yaw = Math.atan2(siny_cosp, cosy_cosp);

  return { x: roll, y: pitch, z: yaw };
}

// Matrix to Quaternion
export function matrixToQuaternion(m: Matrix3x3): Quaternion {
  const trace = m[0][0] + m[1][1] + m[2][2];
  let q: Quaternion;

  if (trace > 0) {
    const s = 0.5 / Math.sqrt(trace + 1.0);
    q = {
      w: 0.25 / s,
      x: (m[2][1] - m[1][2]) * s,
      y: (m[0][2] - m[2][0]) * s,
      z: (m[1][0] - m[0][1]) * s
    };
  } else if (m[0][0] > m[1][1] && m[0][0] > m[2][2]) {
    const s = 2.0 * Math.sqrt(1.0 + m[0][0] - m[1][1] - m[2][2]);
    q = {
      w: (m[2][1] - m[1][2]) / s,
      x: 0.25 * s,
      y: (m[0][1] + m[1][0]) / s,
      z: (m[0][2] + m[2][0]) / s
    };
  } else if (m[1][1] > m[2][2]) {
    const s = 2.0 * Math.sqrt(1.0 + m[1][1] - m[0][0] - m[2][2]);
    q = {
      w: (m[0][2] - m[2][0]) / s,
      x: (m[0][1] + m[1][0]) / s,
      y: 0.25 * s,
      z: (m[1][2] + m[2][1]) / s
    };
  } else {
    const s = 2.0 * Math.sqrt(1.0 + m[2][2] - m[0][0] - m[1][1]);
    q = {
      w: (m[1][0] - m[0][1]) / s,
      x: (m[0][2] + m[2][0]) / s,
      y: (m[1][2] + m[2][1]) / s,
      z: 0.25 * s
    };
  }

  return q;
}

// Quaternion to Matrix
export function quaternionToMatrix(q: Quaternion): Matrix3x3 {
  const { x, y, z, w } = q;
  const x2 = x * x;
  const y2 = y * y;
  const z2 = z * z;
  const xy = x * y;
  const xz = x * z;
  const yz = y * z;
  const wx = w * x;
  const wy = w * y;
  const wz = w * z;

  return [
    [1 - 2 * (y2 + z2), 2 * (xy - wz), 2 * (xz + wy)],
    [2 * (xy + wz), 1 - 2 * (x2 + z2), 2 * (yz - wx)],
    [2 * (xz - wy), 2 * (yz + wx), 1 - 2 * (x2 + y2)]
  ];
}

// Axis-Angle to Quaternion
export function axisAngleToQuaternion(aa: AxisAngle): Quaternion {
  const [x, y, z] = normalizeVector(aa.axis.x, aa.axis.y, aa.axis.z);
  const halfAngle = aa.angle / 2;
  const s = Math.sin(halfAngle);

  return {
    w: Math.cos(halfAngle),
    x: x * s,
    y: y * s,
    z: z * s
  };
}

// Quaternion to Axis-Angle
export function quaternionToAxisAngle(q: Quaternion): AxisAngle {
  const { x, y, z, w } = q;
  const angle = 2 * Math.acos(w);
  
  if (angle === 0) {
    return {
      axis: { x: 1, y: 0, z: 0 },
      angle: 0
    };
  }

  const s = Math.sqrt(1 - w * w);
  const [ax, ay, az] = s < 0.001
    ? [1, 0, 0]  // To avoid division by zero
    : normalizeVector(x / s, y / s, z / s);

  return {
    axis: { x: ax, y: ay, z: az },
    angle
  };
}

// Validation functions
export function isValidQuaternion(q: Quaternion): boolean {
  const { x, y, z, w } = q;
  const length = Math.sqrt(x * x + y * y + z * z + w * w);
  return Math.abs(length - 1) < 0.001; // Allow small numerical errors
}

export function isValidMatrix(m: Matrix3x3): boolean {
  // Check orthogonality and proper determinant
  const det = 
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  
  return Math.abs(det - 1) < 0.001;
}

export function isValidAxisAngle(aa: AxisAngle): boolean {
  const { axis, angle } = aa;
  const length = Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);
  return Math.abs(length - 1) < 0.001 && angle >= 0 && angle <= 2 * Math.PI;
}

// Conversion hub function
export function convertRotation(
  value: EulerAngles | Quaternion | Matrix3x3 | AxisAngle,
  fromFormat: 'euler' | 'quaternion' | 'matrix' | 'axisAngle',
  toFormat: 'euler' | 'quaternion' | 'matrix' | 'axisAngle'
): EulerAngles | Quaternion | Matrix3x3 | AxisAngle {
  // First convert to quaternion as our intermediate format
  let quaternion: Quaternion;
  
  switch (fromFormat) {
    case 'euler':
      quaternion = eulerToQuaternion(value as EulerAngles);
      break;
    case 'quaternion':
      quaternion = value as Quaternion;
      break;
    case 'matrix':
      quaternion = matrixToQuaternion(value as Matrix3x3);
      break;
    case 'axisAngle':
      quaternion = axisAngleToQuaternion(value as AxisAngle);
      break;
    default:
      throw new Error(`Unsupported input format: ${fromFormat}`);
  }

  // Then convert from quaternion to desired format
  switch (toFormat) {
    case 'euler':
      return quaternionToEuler(quaternion);
    case 'quaternion':
      return quaternion;
    case 'matrix':
      return quaternionToMatrix(quaternion);
    case 'axisAngle':
      return quaternionToAxisAngle(quaternion);
    default:
      throw new Error(`Unsupported output format: ${toFormat}`);
  }
} 