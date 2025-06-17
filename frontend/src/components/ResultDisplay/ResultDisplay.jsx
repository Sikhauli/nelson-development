import React from 'react';
import PropTypes from 'prop-types';

const ResultDisplay = ({ result, error, originalInput }) => {
  if (error) {
    return (
      <div className="error-message">
        <h3>Error:</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="result-container">
      <h3>Result:</h3>
      <div className="result-json">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
      <div className="result-breakdown">
        <p>Original string: <strong>{originalInput}</strong></p>
        <p>Sorted characters: <strong>{result.word?.join('')}</strong></p>
      </div>
    </div>
  );
};

ResultDisplay.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  originalInput: PropTypes.string,
};

export default ResultDisplay;