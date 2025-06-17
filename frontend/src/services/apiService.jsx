class ApiService {
    constructor(baseUrl = '') {
      this.baseUrl = baseUrl;
    }
  
    async processString(inputString, customEndpoint = '') {
      const endpoint = customEndpoint || `${this.baseUrl}/webhook`;
      
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: inputString }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('API Service Error:', error);
        throw error;
      }
    }
  
    async notifyTestEndpoint(url, email) {
      const testUrl = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/junior-dev?url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}`;
      return fetch(testUrl);
    }
  }
  
  export default ApiService;