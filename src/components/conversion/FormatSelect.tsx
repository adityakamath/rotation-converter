import { SelectHTMLAttributes } from 'react';
import { RotationFormat } from '@/types/rotation';

interface FormatSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  value: RotationFormat;
  onChange: (format: RotationFormat) => void;
}

export function FormatSelect({ value, onChange, className = '', ...props }: FormatSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as RotationFormat)}
      className={`block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    >
      <option value="euler">Euler Angles (XYZ)</option>
      <option value="quaternion">Quaternion</option>
      <option value="matrix">Rotation Matrix</option>
      <option value="axisAngle">Axis-Angle</option>
    </select>
  );
} 