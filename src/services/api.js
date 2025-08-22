const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  async request(url, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all entries
  async getEntries() {
    return this.request('/entries');
  }

  // Get single entry
  async getEntry(id) {
    return this.request(`/entries/${id}`);
  }

  // Create new entry
  async createEntry(entry) {
    return this.request('/entries', {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  }

  // Update entry
  async updateEntry(id, entry) {
    return this.request(`/entries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entry),
    });
  }

  // Delete entry
  async deleteEntry(id) {
    return this.request(`/entries/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
