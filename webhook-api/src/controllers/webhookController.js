const webhookService = require('../services/webhookService');

const handleWebhook = (req, res) => {
  try {
    const { data } = req.body;

    if (data === undefined) {
      return res.status(400).json({ 
        error: 'Missing required field: "data"' 
      });
    }

    if (typeof data !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid input: "data" must be a string' 
      });
    }

    const sortedWord = webhookService.sortStringAlphabetically(data);
    return res.status(200).json({ word: sortedWord });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { handleWebhook };