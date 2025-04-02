import { useState } from 'react';
import { RotationFormat, RotationResults } from '@/types/rotation';
import FormatSelect from './FormatSelect';
import EulerInput from './inputs/EulerInput';
import QuaternionInput from './inputs/QuaternionInput';
import MatrixInput from './inputs/MatrixInput';
import AxisAngleInput from './inputs/AxisAngleInput';
import TriplePointsInput from './inputs/TriplePointsInput';
import { degreesToRadians, radiansToDegrees } from '@/utils/rotationUtils';

interface ConversionFormProps {
  onConvert: (results: RotationResults) => void;
}

export default function ConversionForm({ onConvert }: ConversionFormProps) {
  const [format, setFormat] = useState<RotationFormat>('euler');
  const [angleFormat, setAngleFormat] = useState<'radians' | 'degrees'>('radians');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = (values: number[]) => {
    try {
      setError(null);
      // Convert degrees to radians if needed
      const convertedValues = angleFormat === 'degrees' 
        ? values.map(degreesToRadians)
        : values;
      
      // Convert and normalize based on format
      let results: RotationResults;
      switch (format) {
        case 'euler':
          results = convertEulerToAll(convertedValues);
          break;
        case 'quaternion':
          results = convertQuaternionToAll(convertedValues);
          break;
        case 'matrix':
          results = convertMatrixToAll(convertedValues);
          break;
        case 'axisAngle':
          results = convertAxisAngleToAll(convertedValues);
          break;
        default:
          throw new Error('Unsupported format');
      }

      // Convert results back to degrees if needed
      if (angleFormat === 'degrees') {
        results.euler = results.euler.map(radiansToDegrees);
        if (results.axisAngle) {
          results.axisAngle[1] = radiansToDegrees(results.axisAngle[1]);
        }
      }

      onConvert(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <FormatSelect
          value={format}
          onChange={setFormat}
          label="Input Format"
        />
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Angle Format:</span>
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setAngleFormat('radians')}
              className={`px-3 py-2 text-sm font-medium rounded-l-md ${
                angleFormat === 'radians'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Radians
            </button>
            <button
              type="button"
              onClick={() => setAngleFormat('degrees')}
              className={`px-3 py-2 text-sm font-medium rounded-r-md ${
                angleFormat === 'degrees'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Degrees
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {format === 'euler' && (
          <EulerInput 
            onSubmit={handleConvert}
            angleFormat={angleFormat}
          />
        )}
        {format === 'quaternion' && (
          <QuaternionInput 
            onSubmit={handleConvert}
          />
        )}
        {format === 'matrix' && (
          <MatrixInput 
            onSubmit={handleConvert}
          />
        )}
        {format === 'axisAngle' && (
          <AxisAngleInput 
            onSubmit={handleConvert}
            angleFormat={angleFormat}
          />
        )}
        {format === 'triplePoints' && (
          <TriplePointsInput 
            onSubmit={handleConvert}
          />
        )}
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
} 