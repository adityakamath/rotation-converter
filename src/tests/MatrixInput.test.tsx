import { render, screen, fireEvent } from '@testing-library/react';
import MatrixInput from '@/components/ui/MatrixInput';
import { Matrix3x3 } from '@/types/rotations';

describe('MatrixInput', () => {
  const mockOnChange = jest.fn();
  const identityMatrix: Matrix3x3 = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders a 3x3 matrix input grid', () => {
    render(<MatrixInput value={identityMatrix} onChange={mockOnChange} />);
    
    // Check if all 9 inputs are rendered with correct labels
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        expect(screen.getByLabelText(`M${i}${j}`)).toBeInTheDocument();
      }
    }
  });

  it('displays the provided matrix values', () => {
    render(<MatrixInput value={identityMatrix} onChange={mockOnChange} />);
    
    // Check if identity matrix values are correctly displayed
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const input = screen.getByLabelText(`M${i+1}${j+1}`) as HTMLInputElement;
        expect(Number(input.value)).toBe(identityMatrix[i][j]);
      }
    }
  });

  it('calls onChange when a matrix value changes', () => {
    render(<MatrixInput value={identityMatrix} onChange={mockOnChange} />);
    
    const input = screen.getByLabelText('M11');
    fireEvent.change(input, { target: { value: '0.5' } });

    expect(mockOnChange).toHaveBeenCalledWith([
      [0.5, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]);
  });

  it('displays error message when provided', () => {
    const errorMessage = 'Invalid matrix';
    render(
      <MatrixInput
        value={identityMatrix}
        onChange={mockOnChange}
        error={errorMessage}
      />
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
}); 