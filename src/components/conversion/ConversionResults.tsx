import { RotationResults } from '@/types/rotations';
import CopyButton from '../ui/CopyButton';
import RotationVisualizer from '../visualization/RotationVisualizer';

interface ConversionResultsProps {
  results: RotationResults;
}

export default function ConversionResults({ results }: ConversionResultsProps) {
  const formatValue = (value: number) => value.toFixed(6);
  
  const formatMatrix = (matrix: number[][]) => {
    return matrix.map(row => row.map(formatValue).join(', ')).join('\n');
  };

  const formatQuaternion = (q: { w: number; x: number; y: number; z: number }) => {
    return `w: ${formatValue(q.w)}, x: ${formatValue(q.x)}, y: ${formatValue(q.y)}, z: ${formatValue(q.z)}`;
  };

  const formatAxisAngle = (aa: { axis: { x: number; y: number; z: number }; angle: number }) => {
    return `axis: (${formatValue(aa.axis.x)}, ${formatValue(aa.axis.y)}, ${formatValue(aa.axis.z)}), angle: ${formatValue(aa.angle)}`;
  };

  const formatEuler = (euler: { x: number; y: number; z: number }) => {
    return `x: ${formatValue(euler.x)}, y: ${formatValue(euler.y)}, z: ${formatValue(euler.z)}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Results</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <RotationVisualizer rotation={results} />
        <div className="p-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Interactive 3D visualization. Click and drag to rotate the view.
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="p-3 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Euler Angles (radians)</h3>
            <CopyButton text={formatEuler(results.euler)} />
          </div>
          <pre className="mt-2 text-sm">{formatEuler(results.euler)}</pre>
        </div>

        <div className="p-3 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Quaternion</h3>
            <CopyButton text={formatQuaternion(results.quaternion)} />
          </div>
          <pre className="mt-2 text-sm">{formatQuaternion(results.quaternion)}</pre>
        </div>

        <div className="p-3 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Rotation Matrix</h3>
            <CopyButton text={formatMatrix(results.matrix)} />
          </div>
          <pre className="mt-2 text-sm">{formatMatrix(results.matrix)}</pre>
        </div>

        <div className="p-3 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Axis-Angle</h3>
            <CopyButton text={formatAxisAngle(results.axisAngle)} />
          </div>
          <pre className="mt-2 text-sm">{formatAxisAngle(results.axisAngle)}</pre>
        </div>
      </div>
    </div>
  );
} 