import { ChangeEvent } from 'react';

interface MatrixInputProps {
  matrix: string[][];
  onChange: (row: number, col: number, value: string) => void;
  className?: string;
}

export function MatrixInput({ matrix, onChange, className = '' }: MatrixInputProps) {
  const handleChange = (row: number, col: number) => (e: ChangeEvent<HTMLInputElement>) => {
    onChange(row, col, e.target.value);
  };

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      {matrix.map((row, i) => (
        row.map((value, j) => (
          <div key={`${i}-${j}`}>
            <label htmlFor={`matrix-${i}-${j}`} className="block text-sm font-medium text-gray-700">
              {`M${i+1}${j+1}`}
            </label>
            <input
              type="number"
              id={`matrix-${i}-${j}`}
              value={value}
              onChange={handleChange(i, j)}
              className={inputClass}
              placeholder="0"
              step="any"
            />
          </div>
        ))
      ))}
    </div>
  );
} 