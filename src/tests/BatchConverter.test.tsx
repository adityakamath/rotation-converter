import { render, screen, fireEvent } from '@testing-library/react';
import BatchConverter from '@/components/conversion/BatchConverter';

describe('BatchConverter', () => {
  const mockOnResults = jest.fn();

  beforeEach(() => {
    mockOnResults.mockClear();
  });

  it('renders with default input format', () => {
    render(<BatchConverter onResults={mockOnResults} />);
    expect(screen.getByText('Input Format')).toBeInTheDocument();
    expect(screen.getByText('Euler Angles')).toBeInTheDocument();
  });

  it('updates placeholder text when format changes', () => {
    render(<BatchConverter onResults={mockOnResults} />);
    
    // Get the textarea
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', expect.stringContaining('x, y, z'));
    
    // Change format to quaternion
    fireEvent.click(screen.getByRole('button', { name: /Euler Angles/i }));
    fireEvent.click(screen.getByText('Quaternion'));
    
    expect(textarea).toHaveAttribute('placeholder', expect.stringContaining('w, x, y, z'));
  });

  it('handles valid euler angles input', () => {
    render(<BatchConverter onResults={mockOnResults} />);
    
    const input = '0, 1.57, 0\n3.14, 0, 1.57';
    fireEvent.change(screen.getByRole('textbox'), { target: { value: input } });
    
    fireEvent.click(screen.getByRole('button', { name: /Convert All/i }));
    
    expect(mockOnResults).toHaveBeenCalled();
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it('shows error for invalid input', () => {
    render(<BatchConverter onResults={mockOnResults} />);
    
    const input = '0, 1.57\n3.14, 0, 1.57'; // First line missing a value
    fireEvent.change(screen.getByRole('textbox'), { target: { value: input } });
    
    fireEvent.click(screen.getByRole('button', { name: /Convert All/i }));
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(mockOnResults).not.toHaveBeenCalled();
  });

  it('handles empty input', () => {
    render(<BatchConverter onResults={mockOnResults} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Convert All/i }));
    
    expect(screen.getByText(/No valid inputs found/i)).toBeInTheDocument();
    expect(mockOnResults).not.toHaveBeenCalled();
  });

  it('handles whitespace and different separators', () => {
    render(<BatchConverter onResults={mockOnResults} />);
    
    const input = '0 1.57 0\n  3.14,0,1.57  '; // Mixed spaces and commas
    fireEvent.change(screen.getByRole('textbox'), { target: { value: input } });
    
    fireEvent.click(screen.getByRole('button', { name: /Convert All/i }));
    
    expect(mockOnResults).toHaveBeenCalled();
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
}); 