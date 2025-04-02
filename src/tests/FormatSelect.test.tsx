import { render, screen, fireEvent } from '@testing-library/react';
import FormatSelect from '@/components/ui/FormatSelect';
import { RotationFormat } from '@/types/rotations';

describe('FormatSelect', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with default props', () => {
    render(<FormatSelect value="euler" onChange={mockOnChange} />);
    expect(screen.getByText('Format')).toBeInTheDocument();
    expect(screen.getByText('Euler Angles')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<FormatSelect value="euler" onChange={mockOnChange} label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('shows all format options when clicked', () => {
    render(<FormatSelect value="euler" onChange={mockOnChange} />);
    
    // Click the button to open the dropdown
    fireEvent.click(screen.getByRole('button'));

    // Check if all options are visible
    expect(screen.getByText('Euler Angles')).toBeInTheDocument();
    expect(screen.getByText('Quaternion')).toBeInTheDocument();
    expect(screen.getByText('Rotation Matrix')).toBeInTheDocument();
    expect(screen.getByText('Axis-Angle')).toBeInTheDocument();
  });

  it('calls onChange when a new format is selected', () => {
    render(<FormatSelect value="euler" onChange={mockOnChange} />);
    
    // Open the dropdown
    fireEvent.click(screen.getByRole('button'));
    
    // Click on 'Quaternion' option
    fireEvent.click(screen.getByText('Quaternion'));
    
    // Check if onChange was called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith('quaternion');
  });

  it('displays the currently selected value', () => {
    const formats: RotationFormat[] = ['euler', 'quaternion', 'matrix', 'axisAngle'];
    const formatNames = ['Euler Angles', 'Quaternion', 'Rotation Matrix', 'Axis-Angle'];
    
    formats.forEach((format, index) => {
      render(<FormatSelect value={format} onChange={mockOnChange} />);
      expect(screen.getByText(formatNames[index])).toBeInTheDocument();
    });
  });
}); 