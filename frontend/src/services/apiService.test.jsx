import ApiService from './apiService';

describe('ApiService', () => {
  let apiService;
  const mockFetch = jest.fn();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  beforeEach(() => {
    apiService = new ApiService('http://localhost:3000');
    mockFetch.mockClear();
  });

  describe('processString', () => {
    it('should call the API with correct parameters', async () => {
      const mockResponse = { word: ['a', 'b', 'c'] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiService.processString('test');
      
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: 'test' }),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when API call fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

      await expect(apiService.processString('test')).rejects.toThrow('HTTP error! status: 400');
    });
  });

  describe('notifyTestEndpoint', () => {
    it('should call the test endpoint with encoded parameters', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });
      
      await apiService.notifyTestEndpoint('http://test.com', 'test@example.com');
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/junior-dev?url=http%3A%2F%2Ftest.com&email=test%40example.com'
      );
    });
  });
});