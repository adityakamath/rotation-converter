import { render, screen, fireEvent, act } from '@testing-library/react';
import CopyButton from '@/components/ui/CopyButton';

describe('CopyButton', () => {
  const mockClipboard = {
    writeText: jest.fn(),
  };

  beforeAll(() => {
    // Mock the clipboard API
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    });
  });

  beforeEach(() => {
    mockClipboard.writeText.mockClear();
  });

  it('renders with copy icon initially', () => {
    render(<CopyButton text="test" />);
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Copy to clipboard');
  });

  it('copies text to clipboard when clicked', async () => {
    const textToCopy = 'test text';
    render(<CopyButton text={textToCopy} />);

    mockClipboard.writeText.mockResolvedValueOnce(undefined);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(mockClipboard.writeText).toHaveBeenCalledWith(textToCopy);
  });

  it('shows success icon temporarily after copying', async () => {
    jest.useFakeTimers();
    
    render(<CopyButton text="test" />);
    mockClipboard.writeText.mockResolvedValueOnce(undefined);
    
    fireEvent.click(screen.getByRole('button'));
    
    // Check for success icon
    expect(screen.getByTitle('Copy to clipboard')).toBeInTheDocument();
    
    // Fast-forward 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    // Check if back to copy icon
    expect(screen.getByTitle('Copy to clipboard')).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  it('handles copy failure gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<CopyButton text="test" />);
    mockClipboard.writeText.mockRejectedValueOnce(new Error('Copy failed'));
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
}); 