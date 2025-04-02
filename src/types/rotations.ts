export type EulerAngles = {
  x: number; // rotation around x-axis (roll)
  y: number; // rotation around y-axis (pitch)
  z: number; // rotation around z-axis (yaw)
};

export type Quaternion = {
  x: number;
  y: number;
  z: number;
  w: number;
};

export type Matrix3x3 = [
  [number, number, number],
  [number, number, number],
  [number, number, number]
];

export type AxisAngle = {
  axis: {
    x: number;
    y: number;
    z: number;
  };
  angle: number;
};

export type RotationFormat = 'euler' | 'quaternion' | 'matrix' | 'axisAngle';

export interface RotationState {
  format: RotationFormat;
  value: EulerAngles | Quaternion | Matrix3x3 | AxisAngle;
} 