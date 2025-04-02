import { render, screen, fireEvent } from '@testing-library/react';
import NumberInput from '@/components/ui/NumberInput';

describe('NumberInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with required props', () => {
    render(<NumberInput label="Test Input" value={0} onChange={mockOnChange} />);
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveValue(0);
  });

  it('handles value changes', () => {
    render(<NumberInput label="Test Input" value={0} onChange={mockOnChange} />);
    const input = screen.getByRole('spinbutton');
    
    fireEvent.change(input, { target: { value: '42' } });
    expect(mockOnChange).toHaveBeenCalledWith(42);
  });

  it('displays error message when provided', () => {
    const errorMessage = 'Invalid input';
    render(
      <NumberInput
        label="Test Input"
        value={0}
        onChange={mockOnChange}
        error={errorMessage}
      />
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('applies custom step value', () => {
    render(
      <NumberInput
        label="Test Input"
        value={0}
        onChange={mockOnChange}
        step={0.5}
      />
    );
    expect(screen.getByRole('spinbutton')).toHaveAttribute('step', '0.5');
  });

  it('applies min and max constraints', () => {
    render(
      <NumberInput
        label="Test Input"
        value={0}
        onChange={mockOnChange}
        min={-1}
        max={1}
      />
    );
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '-1');
    expect(input).toHaveAttribute('max', '1');
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(
      <NumberInput
        label="Test Input"
        value={0}
        onChange={mockOnChange}
        className={customClass}
      />
    );
    expect(screen.getByTestId('number-input-container')).toHaveClass(customClass);
  });

  it('ignores invalid number inputs', () => {
    render(<NumberInput label="Test Input" value={0} onChange={mockOnChange} />);
    const input = screen.getByRole('spinbutton');
    
    fireEvent.change(input, { target: { value: 'not a number' } });
    expect(mockOnChange).not.toHaveBeenCalled();
  });
}); 