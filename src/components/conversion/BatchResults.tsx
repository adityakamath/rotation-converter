import { useState } from 'react';
import { RotationResults } from '@/types/rotations';
import CopyButton from '../ui/CopyButton';

interface BatchResultsProps {
  results: RotationResults[];
}

export default function BatchResults({ results }: BatchResultsProps) {
  const [selectedFormat, setSelectedFormat] = useState<'euler' | 'quaternion' | 'matrix' | 'axisAngle'>('euler');

  const formatValue = (value: number) => value.toFixed(6);

  const formatEuler = (euler: { x: number; y: number; z: number }) => {
    return `${formatValue(euler.x)}, ${formatValue(euler.y)}, ${formatValue(euler.z)}`;
  };

  const formatQuaternion = (q: { w: number; x: number; y: number; z: number }) => {
    return `${formatValue(q.w)}, ${formatValue(q.x)}, ${formatValue(q.y)}, ${formatValue(q.z)}`;
  };

  const formatMatrix = (matrix: number[][]) => {
    return matrix.map(row => row.map(formatValue).join(', ')).join(', ');
  };

  const formatAxisAngle = (aa: { axis: { x: number; y: number; z: number }; angle: number }) => {
    return `${formatValue(aa.axis.x)}, ${formatValue(aa.axis.y)}, ${formatValue(aa.axis.z)}, ${formatValue(aa.angle)}`;
  };

  const getFormattedResults = () => {
    return results.map(result => {
      switch (selectedFormat) {
        case 'euler':
          return formatEuler(result.euler);
        case 'quaternion':
          return formatQuaternion(result.quaternion);
        case 'matrix':
          return formatMatrix(result.matrix);
        case 'axisAngle':
          return formatAxisAngle(result.axisAngle);
      }
    }).join('\n');
  };

  const getFormatLabel = () => {
    switch (selectedFormat) {
      case 'euler':
        return 'Euler Angles (x, y, z)';
      case 'quaternion':
        return 'Quaternion (w, x, y, z)';
      case 'matrix':
        return 'Matrix (row-major)';
      case 'axisAngle':
        return 'Axis-Angle (x, y, z, angle)';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Batch Results</h2>
        <div className="flex items-center gap-2">
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="euler">Euler Angles</option>
            <option value="quaternion">Quaternion</option>
            <option value="matrix">Matrix</option>
            <option value="axisAngle">Axis-Angle</option>
          </select>
          <CopyButton text={getFormattedResults()} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">
            {getFormatLabel()} - {results.length} result{results.length !== 1 ? 's' : ''}
          </h3>
        </div>
        <pre className="p-4 text-sm overflow-x-auto whitespace-pre">
          {getFormattedResults()}
        </pre>
      </div>
    </div>
  );
} 