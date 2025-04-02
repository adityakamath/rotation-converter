import { render, screen } from '@testing-library/react';
import ConversionResults from '@/components/conversion/ConversionResults';
import { RotationResults } from '@/types/rotations';

describe('ConversionResults', () => {
  const mockResults: RotationResults = {
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
  };

  it('renders all rotation formats', () => {
    render(<ConversionResults results={mockResults} />);
    
    expect(screen.getByText('Euler Angles (radians)')).toBeInTheDocument();
    expect(screen.getByText('Quaternion')).toBeInTheDocument();
    expect(screen.getByText('Rotation Matrix')).toBeInTheDocument();
    expect(screen.getByText('Axis-Angle')).toBeInTheDocument();
  });

  it('formats values with 6 decimal places', () => {
    render(<ConversionResults results={mockResults} />);
    
    // Check quaternion formatting
    const content = screen.getByText(/w: 0.707107/);
    expect(content).toBeInTheDocument();
  });

  it('renders copy buttons for each format', () => {
    render(<ConversionResults results={mockResults} />);
    
    const copyButtons = screen.getAllByTitle('Copy to clipboard');
    expect(copyButtons).toHaveLength(4); // One for each format
  });

  it('displays results in pre tags for proper formatting', () => {
    render(<ConversionResults results={mockResults} />);
    
    const preTags = screen.getAllByText(/[xyz]:/, { selector: 'pre' });
    expect(preTags.length).toBeGreaterThan(0);
  });
}); 