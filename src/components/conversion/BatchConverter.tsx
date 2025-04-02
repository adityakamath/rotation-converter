import { useState } from 'react';
import { RotationFormat, RotationResults } from '@/types/rotations';
import { convertRotation } from '@/utils/rotationUtils';
import FormatSelect from '../ui/FormatSelect';
import { Button } from '../ui/Button';

interface BatchInput {
  format: RotationFormat;
  values: string;
}

interface BatchConverterProps {
  onResults?: (results: RotationResults[]) => void;
}

export default function BatchConverter({ onResults }: BatchConverterProps) {
  const [inputFormat, setInputFormat] = useState<RotationFormat>('euler');
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const parseInput = (text: string): number[][] => {
    return text
      .trim()
      .split('\n')
      .map(line => 
        line
          .trim()
          .split(/[,\s]+/)
          .map(num => parseFloat(num))
      )
      .filter(nums => nums.every(num => !isNaN(num)));
  };

  const handleConvert = () => {
    try {
      setError(null);
      const parsedInputs = parseInput(inputText);
      
      if (parsedInputs.length === 0) {
        setError('No valid inputs found. Please check your format.');
        return;
      }

      const results = parsedInputs.map(values => {
        try {
          switch (inputFormat) {
            case 'euler':
              if (values.length !== 3) throw new Error('Euler angles require 3 values');
              return convertRotation({ format: 'euler', x: values[0], y: values[1], z: values[2] });
            
            case 'quaternion':
              if (values.length !== 4) throw new Error('Quaternion requires 4 values');
              return convertRotation({ format: 'quaternion', w: values[0], x: values[1], y: values[2], z: values[3] });
            
            case 'axisAngle':
              if (values.length !== 4) throw new Error('Axis-angle requires 4 values');
              return convertRotation({
                format: 'axisAngle',
                axis: { x: values[0], y: values[1], z: values[2] },
                angle: values[3]
              });
            
            case 'matrix':
              if (values.length !== 9) throw new Error('Matrix requires 9 values');
              return convertRotation({
                format: 'matrix',
                matrix: [
                  [values[0], values[1], values[2]],
                  [values[3], values[4], values[5]],
                  [values[6], values[7], values[8]]
                ]
              });
            
            default:
              throw new Error('Unsupported format');
          }
        } catch (err) {
          throw new Error(`Error converting line ${parsedInputs.indexOf(values) + 1}: ${err.message}`);
        }
      });

      onResults?.(results);
    } catch (err) {
      setError(err.message);
    }
  };

  const getPlaceholder = () => {
    switch (inputFormat) {
      case 'euler':
        return 'Enter one rotation per line:\nx, y, z\n0, 1.57, 0\n3.14, 0, 1.57';
      case 'quaternion':
        return 'Enter one rotation per line:\nw, x, y, z\n1, 0, 0, 0\n0.707, 0, 0.707, 0';
      case 'axisAngle':
        return 'Enter one rotation per line:\nx, y, z, angle\n1, 0, 0, 1.57\n0, 1, 0, 3.14';
      case 'matrix':
        return 'Enter one rotation per line:\nm11, m12, m13, m21, m22, m23, m31, m32, m33\n1, 0, 0, 0, 1, 0, 0, 0, 1';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <FormatSelect
          value={inputFormat}
          onChange={setInputFormat}
          label="Input Format"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Batch Input
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={getPlaceholder()}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:border-blue-500 sm:text-sm font-mono"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      <div>
        <Button
          onClick={handleConvert}
          className="w-full sm:w-auto"
        >
          Convert All
        </Button>
      </div>
    </div>
  );
} 