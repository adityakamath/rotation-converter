import { ChangeEvent } from 'react';

interface Point {
  x: string;
  y: string;
  z: string;
}

interface TriplePointsInputProps {
  points: [Point, Point, Point];
  onChange: (pointIndex: number, axis: 'x' | 'y' | 'z', value: string) => void;
  className?: string;
}

export function TriplePointsInput({ points, onChange, className = '' }: TriplePointsInputProps) {
  const handleChange = (pointIndex: number, axis: 'x' | 'y' | 'z') => (e: ChangeEvent<HTMLInputElement>) => {
    onChange(pointIndex, axis, e.target.value);
  };

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className={`space-y-4 ${className}`}>
      {points.map((point, i) => (
        <div key={i} className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Point {i + 1}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor={`point-${i}-x`} className="block text-sm font-medium text-gray-700">X</label>
              <input
                type="number"
                id={`point-${i}-x`}
                value={point.x}
                onChange={handleChange(i, 'x')}
                className={inputClass}
                placeholder="0"
                step="any"
              />
            </div>
            <div>
              <label htmlFor={`point-${i}-y`} className="block text-sm font-medium text-gray-700">Y</label>
              <input
                type="number"
                id={`point-${i}-y`}
                value={point.y}
                onChange={handleChange(i, 'y')}
                className={inputClass}
                placeholder="0"
                step="any"
              />
            </div>
            <div>
              <label htmlFor={`point-${i}-z`} className="block text-sm font-medium text-gray-700">Z</label>
              <input
                type="number"
                id={`point-${i}-z`}
                value={point.z}
                onChange={handleChange(i, 'z')}
                className={inputClass}
                placeholder="0"
                step="any"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 