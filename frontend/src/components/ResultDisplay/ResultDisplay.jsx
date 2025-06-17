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
        <h3 className="result-title">Processing Result</h3>
        <div className="result-json">
         <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
        <div className="result-breakdown">
         <p className="result-original">
         <span className="result-label">Original string:</span>
         <span className="result-value">{originalInput}</span>
         </p>
         <p className="result-sorted">
         <span className="result-label">Sorted characters:</span>
         <span className="result-value">{result.word?.join('')}</span>
         </p>
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