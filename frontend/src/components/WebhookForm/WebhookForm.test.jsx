import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WebhookForm from './WebhookForm';

describe('WebhookForm', () => {
  const mockSubmit = jest.fn();
  const props = {
    onSubmit: mockSubmit,
    isSubmitting: false,
  };

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders correctly', () => {
    const { getByLabelText, getByText } = render(<WebhookForm {...props} />);
    
    expect(getByLabelText('Input String:')).toBeInTheDocument();
    expect(getByLabelText('Custom Endpoint URL (optional):')).toBeInTheDocument();
    expect(getByLabelText('Your Email (optional):')).toBeInTheDocument();
    expect(getByText('Process String')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', () => {
    const { getByLabelText, getByText } = render(<WebhookForm {...props} />);
    
    fireEvent.change(getByLabelText('Input String:'), { target: { value: 'test' } });
    fireEvent.change(getByLabelText('Custom Endpoint URL (optional):'), { target: { value: 'http://test.com' } });
    fireEvent.change(getByLabelText('Your Email (optional):'), { target: { value: 'test@example.com' } });
    fireEvent.click(getByText('Process String'));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      inputData: 'test',
      endpointUrl: 'http://test.com',
      email: 'test@example.com',
    });
  });

  it('disables button when isSubmitting is true', () => {
    const { getByText } = render(<WebhookForm {...props} isSubmitting={true} />);
    expect(getByText('Processing...')).toBeDisabled();
  });
});