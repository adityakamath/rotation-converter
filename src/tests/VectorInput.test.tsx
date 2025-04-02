import { render, screen, fireEvent } from '@testing-library/react';
import VectorInput from '@/components/ui/VectorInput';

describe('VectorInput', () => {
  const mockOnChange = jest.fn();
  const defaultVector = { x: 0, y: 0, z: 0 };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with default label', () => {
    render(<VectorInput value={defaultVector} onChange={mockOnChange} />);
    expect(screen.getByText('Vector')).toBeInTheDocument();
    expect(screen.getByLabelText('X')).toBeInTheDocument();
    expect(screen.getByLabelText('Y')).toBeInTheDocument();
    expect(screen.getByLabelText('Z')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(
      <VectorInput
        value={defaultVector}
        onChange={mockOnChange}
        label="Custom Vector"
      />
    );
    expect(screen.getByText('Custom Vector')).toBeInTheDocument();
  });

  it('displays the provided vector values', () => {
    const vector = { x: 1, y: 2, z: 3 };
    render(<VectorInput value={vector} onChange={mockOnChange} />);
    
    expect(screen.getByLabelText('X')).toHaveValue(1);
    expect(screen.getByLabelText('Y')).toHaveValue(2);
    expect(screen.getByLabelText('Z')).toHaveValue(3);
  });

  it('calls onChange when x component changes', () => {
    render(<VectorInput value={defaultVector} onChange={mockOnChange} />);
    
    const input = screen.getByLabelText('X');
    fireEvent.change(input, { target: { value: '1' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultVector,
      x: 1
    });
  });

  it('calls onChange when y component changes', () => {
    render(<VectorInput value={defaultVector} onChange={mockOnChange} />);
    
    const input = screen.getByLabelText('Y');
    fireEvent.change(input, { target: { value: '1' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultVector,
      y: 1
    });
  });

  it('calls onChange when z component changes', () => {
    render(<VectorInput value={defaultVector} onChange={mockOnChange} />);
    
    const input = screen.getByLabelText('Z');
    fireEvent.change(input, { target: { value: '1' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultVector,
      z: 1
    });
  });

  it('displays error message when provided', () => {
    const errorMessage = 'Invalid vector';
    render(
      <VectorInput
        value={defaultVector}
        onChange={mockOnChange}
        error={errorMessage}
      />
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
}); 