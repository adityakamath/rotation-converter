import { ChangeEvent } from 'react';

interface AxisAngleInputProps {
  angle: string;
  x: string;
  y: string;
  z: string;
  onChange: (field: 'angle' | 'x' | 'y' | 'z', value: string) => void;
  className?: string;
}

export function AxisAngleInput({ angle, x, y, z, onChange, className = '' }: AxisAngleInputProps) {
  const handleChange = (field: 'angle' | 'x' | 'y' | 'z') => (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="angle" className="block text-sm font-medium text-gray-700">Angle (degrees)</label>
        <input
          type="number"
          id="angle"
          value={angle}
          onChange={handleChange('angle')}
          className={inputClass}
          placeholder="0"
          step="any"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="axis-x" className="block text-sm font-medium text-gray-700">Axis X</label>
          <input
            type="number"
            id="axis-x"
            value={x}
            onChange={handleChange('x')}
            className={inputClass}
            placeholder="1"
            step="any"
          />
        </div>
        <div>
          <label htmlFor="axis-y" className="block text-sm font-medium text-gray-700">Axis Y</label>
          <input
            type="number"
            id="axis-y"
            value={y}
            onChange={handleChange('y')}
            className={inputClass}
            placeholder="0"
            step="any"
          />
        </div>
        <div>
          <label htmlFor="axis-z" className="block text-sm font-medium text-gray-700">Axis Z</label>
          <input
            type="number"
            id="axis-z"
            value={z}
            onChange={handleChange('z')}
            className={inputClass}
            placeholder="0"
            step="any"
          />
        </div>
      </div>
    </div>
  );
} 