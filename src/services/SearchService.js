// src/services/SearchService.js
// This class simulates the logic for handling search queries. In a real
// application, this would likely be a single, powerful endpoint on a backend
// service that uses a search index like Elasticsearch or Algolia.

class SearchService {
  /**
   * Performs a search across multiple data types (posts, users).
   * @param {string} query - The search term entered by the user.
   * @returns {Promise<{ results: { posts: Array, users: Array } }>}
   */
  static performSearch(query) {
    console.log(`Simulating a search for the query: "${query}"`);

    if (!query || query.trim() === '') {
      return Promise.resolve({ results: { posts: [], users: [] } });
    }

    // Mock data simulating what a backend might return.
    const mockPostResults = [
      {
        id: 'post_123',
        title: `A post about "${query}"`,
        description: `This is a short description of a post that matches the query...`,
        authorUsername: 'TechWriter',
      },
    ];

    const mockUserResults = [
      {
        id: 'user_456',
        username: `${query}Lover`,
        tagline: `Big fan of all things related to ${query}.`,
      },
    ];

    // In a real app, the backend would perform the search and return the results.
    return Promise.resolve({ results: { posts: mockPostResults, users: mockUserResults } });
  }
}

export default SearchService;
