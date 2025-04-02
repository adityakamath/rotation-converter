import { ChangeEvent } from 'react';

interface QuaternionInputProps {
  w: string;
  x: string;
  y: string;
  z: string;
  onChange: (component: 'w' | 'x' | 'y' | 'z', value: string) => void;
  className?: string;
}

export function QuaternionInput({ w, x, y, z, onChange, className = '' }: QuaternionInputProps) {
  const handleChange = (component: 'w' | 'x' | 'y' | 'z') => (e: ChangeEvent<HTMLInputElement>) => {
    onChange(component, e.target.value);
  };

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      <div>
        <label htmlFor="w" className="block text-sm font-medium text-gray-700">W</label>
        <input
          type="number"
          id="w"
          value={w}
          onChange={handleChange('w')}
          className={inputClass}
          placeholder="1"
          step="any"
        />
      </div>
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