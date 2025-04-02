import { useState } from 'react';
import { TriplePoints } from '@/utils/rotationUtils';
import NumberInput from '../ui/NumberInput';

interface TriplePointsInputProps {
  onSubmit: (values: number[]) => void;
}

export default function TriplePointsInput({ onSubmit }: TriplePointsInputProps) {
  const [points, setPoints] = useState<TriplePoints>({
    P: [0, 0, 0],
    Q: [1, 0, 0],
    R: [0, 0, 1]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert points to flat array for processing
    const values = [
      ...points.P,
      ...points.Q,
      ...points.R
    ];
    onSubmit(values);
  };

  const updatePoint = (point: 'P' | 'Q' | 'R', index: number, value: number) => {
    setPoints(prev => ({
      ...prev,
      [point]: prev[point].map((v, i) => i === index ? value : v)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {(['P', 'Q', 'R'] as const).map(point => (
          <div key={point} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Point {point}
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['x', 'y', 'z'].map((axis, index) => (
                <NumberInput
                  key={axis}
                  label={axis.toUpperCase()}
                  value={points[point][index]}
                  onChange={(value) => updatePoint(point, index, value)}
                  step={0.1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Convert
        </button>
      </div>

      <div className="text-sm text-gray-600">
        <p>Define three points P, Q, and R such that:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>X axis is parallel to (Q-P)</li>
          <li>Z axis is parallel to X × (R-P)</li>
          <li>Y axis is parallel to Z × X</li>
        </ul>
      </div>
    </form>
  );
} 