const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/webhookController');

router.post('/', handleWebhook);

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

module.exports = router;