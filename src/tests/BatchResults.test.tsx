import { render, screen, fireEvent } from '@testing-library/react';
import BatchResults from '@/components/conversion/BatchResults';
import { RotationResults } from '@/types/rotations';

describe('BatchResults', () => {
  const mockResults: RotationResults[] = [
    {
      euler: { x: 0, y: Math.PI/2, z: 0 },
      quaternion: { w: 0.7071067811865476, x: 0, y: 0.7071067811865475, z: 0 },
      matrix: [
        [0, 0, 1],
        [0, 1, 0],
        [-1, 0, 0]
      ],
      axisAngle: {
        axis: { x: 0, y: 1, z: 0 },
        angle: Math.PI/2
      }
    },
    {
      euler: { x: Math.PI, y: 0, z: 0 },
      quaternion: { w: 0, x: 1, y: 0, z: 0 },
      matrix: [
        [1, 0, 0],
        [0, -1, 0],
        [0, 0, -1]
      ],
      axisAngle: {
        axis: { x: 1, y: 0, z: 0 },
        angle: Math.PI
      }
    }
  ];

  it('renders with initial euler format', () => {
    render(<BatchResults results={mockResults} />);
    expect(screen.getByText('Batch Results')).toBeInTheDocument();
    expect(screen.getByText(/Euler Angles \(x, y, z\)/)).toBeInTheDocument();
  });

  it('shows correct number of results', () => {
    render(<BatchResults results={mockResults} />);
    expect(screen.getByText('2 results')).toBeInTheDocument();
  });

  it('formats values with 6 decimal places', () => {
    render(<BatchResults results={mockResults} />);
    const content = screen.getByText(/0.000000, 1.570796, 0.000000/);
    expect(content).toBeInTheDocument();
  });

  it('switches between formats', () => {
    render(<BatchResults results={mockResults} />);
    
    // Switch to quaternion format
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'quaternion' } });
    expect(screen.getByText(/Quaternion \(w, x, y, z\)/)).toBeInTheDocument();
    expect(screen.getByText(/0.707107/)).toBeInTheDocument();
    
    // Switch to matrix format
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'matrix' } });
    expect(screen.getByText(/Matrix \(row-major\)/)).toBeInTheDocument();
    
    // Switch to axis-angle format
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'axisAngle' } });
    expect(screen.getByText(/Axis-Angle \(x, y, z, angle\)/)).toBeInTheDocument();
  });

  it('renders copy button', () => {
    render(<BatchResults results={mockResults} />);
    expect(screen.getByTitle('Copy to clipboard')).toBeInTheDocument();
  });

  it('handles single result correctly', () => {
    render(<BatchResults results={[mockResults[0]]} />);
    expect(screen.getByText('1 result')).toBeInTheDocument();
  });
}); 