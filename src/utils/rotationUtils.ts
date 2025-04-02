export const DECIMAL_PLACES = 7;  // Update from 6 to 7

export interface TriplePoints {
  P: [number, number, number];
  Q: [number, number, number];
  R: [number, number, number];
}

export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const radiansToDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

export const normalizeVector = (vector: number[]): number[] => {
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return magnitude === 0 ? vector : vector.map(v => v / magnitude);
};

export const triplePointsToMatrix = (points: TriplePoints): number[][] => {
  const P = points.P;
  const Q = points.Q;
  const R = points.R;
  
  // Calculate X axis (Q-P normalized)
  const X = normalizeVector([Q[0]-P[0], Q[1]-P[1], Q[2]-P[2]]);
  
  // Calculate temporary Z axis
  const tempZ = [
    (R[0]-P[0]), 
    (R[1]-P[1]), 
    (R[2]-P[2])
  ];
  
  // Calculate Y axis (Z × X)
  const Y = normalizeVector([
    X[1]*tempZ[2] - X[2]*tempZ[1],
    X[2]*tempZ[0] - X[0]*tempZ[2],
    X[0]*tempZ[1] - X[1]*tempZ[0]
  ]);
  
  // Calculate final Z axis (X × Y)
  const Z = [
    X[1]*Y[2] - X[2]*Y[1],
    X[2]*Y[0] - X[0]*Y[2],
    X[0]*Y[1] - X[1]*Y[0]
  ];
  
  return [
    [X[0], Y[0], Z[0]],
    [X[1], Y[1], Z[1]],
    [X[2], Y[2], Z[2]]
  ];
}; 