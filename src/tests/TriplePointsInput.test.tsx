import { render, screen, fireEvent } from '@testing-library/react';
import TriplePointsInput from '@/components/inputs/TriplePointsInput';

describe('TriplePointsInput', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders with default values', () => {
    render(<TriplePointsInput onSubmit={mockOnSubmit} />);
    
    // Check for point labels
    expect(screen.getByText('Point P')).toBeInTheDocument();
    expect(screen.getByText('Point Q')).toBeInTheDocument();
    expect(screen.getByText('Point R')).toBeInTheDocument();

    // Check for axis labels (9 in total, 3 for each point)
    const xLabels = screen.getAllByText('X');
    const yLabels = screen.getAllByText('Y');
    const zLabels = screen.getAllByText('Z');
    expect(xLabels).toHaveLength(3);
    expect(yLabels).toHaveLength(3);
    expect(zLabels).toHaveLength(3);
  });

  test('submits correct values', () => {
    render(<TriplePointsInput onSubmit={mockOnSubmit} />);
    
    // Default values should be:
    // P: [0, 0, 0]
    // Q: [1, 0, 0]
    // R: [0, 0, 1]
    
    const submitButton = screen.getByText('Convert');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith([
      0, 0, 0,  // P
      1, 0, 0,  // Q
      0, 0, 1   // R
    ]);
  });

  test('updates point values', () => {
    render(<TriplePointsInput onSubmit={mockOnSubmit} />);
    
    // Get all number inputs
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs).toHaveLength(9); // 3 points × 3 coordinates

    // Update P point coordinates
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });

    // Submit and check values
    const submitButton = screen.getByText('Convert');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith([
      1, 2, 3,  // P (updated)
      1, 0, 0,  // Q (default)
      0, 0, 1   // R (default)
    ]);
  });

  test('displays explanation text', () => {
    render(<TriplePointsInput onSubmit={mockOnSubmit} />);
    
    expect(screen.getByText('Define three points P, Q, and R such that:')).toBeInTheDocument();
    expect(screen.getByText('X axis is parallel to (Q-P)')).toBeInTheDocument();
    expect(screen.getByText('Z axis is parallel to X × (R-P)')).toBeInTheDocument();
    expect(screen.getByText('Y axis is parallel to Z × X')).toBeInTheDocument();
  });

  test('prevents form submission', () => {
    render(<TriplePointsInput onSubmit={mockOnSubmit} />);
    
    const form = screen.getByRole('form');
    const mockPreventDefault = jest.fn();
    
    fireEvent.submit(form, {
      preventDefault: mockPreventDefault
    });

    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalled();
  });
}); 