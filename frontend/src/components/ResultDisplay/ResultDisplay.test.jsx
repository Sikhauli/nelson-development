import React from 'react';
import { render } from '@testing-library/react';
import ResultDisplay from './ResultDisplay';

describe('ResultDisplay', () => {
  it('renders nothing when no result or error', () => {
    const { container } = render(<ResultDisplay />);
    expect(container.firstChild).toBeNull();
  });

  it('renders error message when error exists', () => {
    const { getByText } = render(<ResultDisplay error="Test error" />);
    expect(getByText('Error:')).toBeInTheDocument();
    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('renders result correctly', () => {
    const result = { word: ['a', 'b', 'c'] };
    const { getByText } = render(
      <ResultDisplay result={result} originalInput="cba" />
    );
    
    expect(getByText('Result:')).toBeInTheDocument();
    expect(getByText(/"word": \[/)).toBeInTheDocument();
    expect(getByText('Original string:')).toBeInTheDocument();
    expect(getByText('cba')).toBeInTheDocument();
    expect(getByText('Sorted characters:')).toBeInTheDocument();
    expect(getByText('abc')).toBeInTheDocument();
  });
});