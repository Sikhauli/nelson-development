import React, { useState } from 'react';
import ApiService from './services/apiService';
import WebhookForm from './components/WebhookForm';
import ResultDisplay from './components/ResultDisplay';
import './App.css';

const App = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalInput, setOriginalInput] = useState('');
  
  const apiService = new ApiService(process.env.REACT_APP_API_URL);

  const handleSubmit = async ({ inputData, endpointUrl, email }) => {
    setIsSubmitting(true);
    setError(null);
    setOriginalInput(inputData);
    
    try {
      const response = await apiService.processString(inputData, endpointUrl);
      setResult(response);
      
      if (endpointUrl && email) {
        await apiService.notifyTestEndpoint(endpointUrl, email);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while processing your request');
      setResult(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>String Processor</h1>
        <p>Enter a string to sort its characters alphabetically</p>
      </header>
      
      <main className="app-content">
        <WebhookForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        <ResultDisplay 
          result={result} 
          error={error} 
          originalInput={originalInput} 
        />
      </main>
    </div>
  );
};

export default App;