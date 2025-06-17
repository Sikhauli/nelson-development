import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import ApiService from './services/apiService';

jest.mock('./services/apiService');

describe('App', () => {
  let mockProcessString;
  let mockNotifyTestEndpoint;

  beforeEach(() => {
    mockProcessString = jest.fn();
    mockNotifyTestEndpoint = jest.fn();
    
    ApiService.mockImplementation(() => ({
      processString: mockProcessString,
      notifyTestEndpoint: mockNotifyTestEndpoint,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('String Processor')).toBeInTheDocument();
  });

  it('handles form submission and displays result', async () => {
    mockProcessString.mockResolvedValueOnce({ word: ['a', 'b', 'c'] });
    
    const { getByLabelText, getByText, findByText } = render(<App />);
    
    fireEvent.change(getByLabelText('Input String:'), { target: { value: 'cba' } });
    fireEvent.click(getByText('Process String'));
    
    expect(getByText('Processing...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(mockProcessString).toHaveBeenCalledWith('cba', '');
      expect(findByText('Result:')).toBeTruthy();
      expect(findByText('abc')).toBeTruthy();
    });
  });

  it('handles errors and displays error message', async () => {
    mockProcessString.mockRejectedValueOnce(new Error('API Error'));
    
    const { getByLabelText, getByText, findByText } = render(<App />);
    
    fireEvent.change(getByLabelText('Input String:'), { target: { value: 'test' } });
    fireEvent.click(getByText('Process String'));
    
    await waitFor(() => {
      expect(findByText('Error:')).toBeTruthy();
      expect(findByText('API Error')).toBeTruthy();
    });
  });

  it('calls notifyTestEndpoint when email and URL are provided', async () => {
    mockProcessString.mockResolvedValueOnce({ word: ['a'] });
    mockNotifyTestEndpoint.mockResolvedValueOnce({});
    
    const { getByLabelText, getByText } = render(<App />);
    
    fireEvent.change(getByLabelText('Input String:'), { target: { value: 'a' } });
    fireEvent.change(getByLabelText('Custom Endpoint URL (optional):'), { 
      target: { value: 'http://test.com' } 
    });
    fireEvent.change(getByLabelText('Your Email (optional):'), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.click(getByText('Process String'));
    
    await waitFor(() => {
      expect(mockNotifyTestEndpoint).toHaveBeenCalledWith(
        'http://test.com',
        'test@example.com'
      );
    });
  });
});