import { render, screen, fireEvent } from '@testing-library/react';
import ConversionForm from '@/components/conversion/ConversionForm';

describe('ConversionForm', () => {
  it('renders with initial Euler angles format', () => {
    render(<ConversionForm />);
    
    expect(screen.getByText('Input Format')).toBeInTheDocument();
    expect(screen.getByText('Euler Angles')).toBeInTheDocument();
    expect(screen.getByText('Euler Angles (radians)')).toBeInTheDocument();
  });

  it('switches input format when selecting a different format', () => {
    render(<ConversionForm />);
    
    // Open format dropdown
    fireEvent.click(screen.getByRole('button', { name: /Euler Angles/i }));
    
    // Select Quaternion format
    fireEvent.click(screen.getByText('Quaternion'));
    
    // Check if quaternion inputs are displayed
    expect(screen.getByLabelText('W')).toBeInTheDocument();
    expect(screen.getByText('Vector Part')).toBeInTheDocument();
  });

  it('performs conversion when clicking convert button', () => {
    render(<ConversionForm />);
    
    // Click convert button
    fireEvent.click(screen.getByRole('button', { name: /convert/i }));
    
    // Check if results section appears
    expect(screen.getByText('Results')).toBeInTheDocument();
    
    // Check if other formats are displayed in results
    expect(screen.getByText('quaternion')).toBeInTheDocument();
    expect(screen.getByText('matrix')).toBeInTheDocument();
    expect(screen.getByText('axisAngle')).toBeInTheDocument();
  });

  it('shows validation error for invalid quaternion', () => {
    render(<ConversionForm />);
    
    // Switch to quaternion format
    fireEvent.click(screen.getByRole('button', { name: /Euler Angles/i }));
    fireEvent.click(screen.getByText('Quaternion'));
    
    // Set invalid quaternion values (not normalized)
    const wInput = screen.getByLabelText('W');
    fireEvent.change(wInput, { target: { value: '2' } });
    
    // Try to convert
    fireEvent.click(screen.getByRole('button', { name: /convert/i }));
    
    // Check for error message
    expect(screen.getByText(/Invalid quaternion/i)).toBeInTheDocument();
  });
}); 