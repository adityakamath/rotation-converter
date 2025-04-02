import { Matrix3x3 } from '@/types/rotations';
import NumberInput from './NumberInput';

interface MatrixInputProps {
  value: Matrix3x3;
  onChange: (value: Matrix3x3) => void;
  error?: string;
}

export default function MatrixInput({ value, onChange, error }: MatrixInputProps) {
  const handleChange = (row: number, col: number, newValue: number) => {
    const newMatrix = value.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? newValue : c))
    ) as Matrix3x3;
    onChange(newMatrix);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {value.map((row, i) =>
          row.map((cell, j) => (
            <NumberInput
              key={`${i}-${j}`}
              label={`M${i+1}${j+1}`}
              value={cell}
              onChange={(value) => handleChange(i, j, value)}
              step={0.1}
              className="w-full"
            />
          ))
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
} 