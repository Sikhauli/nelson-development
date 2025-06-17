class WebhookService {
    static sortStringAlphabetically(input) {
      if (typeof input !== 'string') {
        throw new Error('Input must be a string');
      }
      
      return input.split('').sort((a, b) => {
        // Case-insensitive sorting
        const lowerA = a.toLowerCase();
        const lowerB = b.toLowerCase();
        if (lowerA < lowerB) return -1;
        if (lowerA > lowerB) return 1;
        return 0;
      });
    }
  }
  
  module.exports = WebhookService;