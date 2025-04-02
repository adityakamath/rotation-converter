import NumberInput from './NumberInput';

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

interface VectorInputProps {
  value: Vector3D;
  onChange: (value: Vector3D) => void;
  label?: string;
  error?: string;
}

export default function VectorInput({
  value,
  onChange,
  label = 'Vector',
  error
}: VectorInputProps) {
  const handleChange = (axis: keyof Vector3D, newValue: number) => {
    onChange({
      ...value,
      [axis]: newValue
    });
  };

  return (
    <div className="space-y-2">
      {label && (
        <h3 className="text-sm font-medium text-gray-700">
          {label}
        </h3>
      )}
      <div className="grid grid-cols-3 gap-2">
        <NumberInput
          label="X"
          value={value.x}
          onChange={(v) => handleChange('x', v)}
          step={0.1}
        />
        <NumberInput
          label="Y"
          value={value.y}
          onChange={(v) => handleChange('y', v)}
          step={0.1}
        />
        <NumberInput
          label="Z"
          value={value.z}
          onChange={(v) => handleChange('z', v)}
          step={0.1}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
} 