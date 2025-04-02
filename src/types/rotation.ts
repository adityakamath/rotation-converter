export type RotationFormat = 
  | 'euler'
  | 'quaternion'
  | 'matrix'
  | 'axisAngle'
  | 'triplePoints'
  | 'axisWithMagnitude';

export type AngleFormat = 'radians' | 'degrees';

export interface RotationResults {
  euler: number[];
  quaternion: number[];
  matrix: number[][];
  axisAngle: [number[], number];  // [axis, angle]
  axisWithMagnitude?: number[];   // axis scaled by angle magnitude
}

export interface ConversionError {
  message: string;
  code: 'INVALID_INPUT' | 'NORMALIZATION_ERROR' | 'CONVERSION_ERROR';
} 