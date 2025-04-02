import { ChangeEvent } from 'react';

interface EulerInputProps {
  x: string;
  y: string;
  z: string;
  onChange: (axis: 'x' | 'y' | 'z', value: string) => void;
  className?: string;
}

export function EulerInput({ x, y, z, onChange, className = '' }: EulerInputProps) {
  const handleChange = (axis: 'x' | 'y' | 'z') => (e: ChangeEvent<HTMLInputElement>) => {
    onChange(axis, e.target.value);
  };

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      <div>
        <label htmlFor="x" className="block text-sm font-medium text-gray-700">X</label>
        <input
          type="number"
          id="x"
          value={x}
          onChange={handleChange('x')}
          className={inputClass}
          placeholder="0"
          step="any"
        />
      </div>
      <div>
        <label htmlFor="y" className="block text-sm font-medium text-gray-700">Y</label>
        <input
          type="number"
          id="y"
          value={y}
          onChange={handleChange('y')}
          className={inputClass}
          placeholder="0"
          step="any"
        />
      </div>
      <div>
        <label htmlFor="z" className="block text-sm font-medium text-gray-700">Z</label>
        <input
          type="number"
          id="z"
          value={z}
          onChange={handleChange('z')}
          className={inputClass}
          placeholder="0"
          step="any"
        />
      </div>
    </div>
  );
} 