const webhookService = require('../services/webhookService');

describe('WebhookService', () => {
  describe('sortStringAlphabetically', () => {
    test('should return characters sorted alphabetically', () => {
      const result = webhookService.sortStringAlphabetically('example');
      expect(result).toEqual(['a', 'e', 'e', 'l', 'm', 'p', 'x']);
    });

    test('should handle empty string', () => {
      const result = webhookService.sortStringAlphabetically('');
      expect(result).toEqual([]);
    });

    test('should sort case-insensitively', () => {
      const result = webhookService.sortStringAlphabetically('bBaA');
      expect(result).toEqual(['a', 'A', 'b', 'B']); // or ['A', 'a', 'B', 'b'] depending on your needs
    });

    test('should throw error for non-string input', () => {
      expect(() => webhookService.sortStringAlphabetically(123)).toThrow('Input must be a string');
    });

    test('should handle special characters', () => {
      const result = webhookService.sortStringAlphabetically('c@b!a');
      expect(result).toEqual(['!', '@', 'a', 'b', 'c']);
    });
  });
});