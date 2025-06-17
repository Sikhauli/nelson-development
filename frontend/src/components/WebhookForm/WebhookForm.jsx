import React, { useState } from 'react';
import PropTypes from 'prop-types';

const WebhookForm = ({ onSubmit, isSubmitting }) => {
  const [inputData, setInputData] = useState('');
  const [endpointUrl, setEndpointUrl] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputData, endpointUrl, email });
  };

  return (
    <form onSubmit={handleSubmit} className="webhook-form">
      <div className="form-group">
        <label htmlFor="inputData">Input String:</label>
        <input
          id="inputData"
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          required
          placeholder="Enter a string to sort"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="endpointUrl">Custom Endpoint URL (optional):</label>
        <input
          id="endpointUrl"
          type="url"
          value={endpointUrl}
          onChange={(e) => setEndpointUrl(e.target.value)}
          placeholder="https://your-api.com/webhook"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Your Email (optional):</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Process String'}
      </button>
    </form>
  );
};

WebhookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default WebhookForm;