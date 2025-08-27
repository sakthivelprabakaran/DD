// AuthService.js
// This class simulates the behavior of an authentication service. In a real
// application, these methods would make network requests to a secure backend API.

class AuthService {
  /**
   * Registers a new user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<{user: {email: string, uid: string}}>}
   */
  static register(email, password) {
    if (!email || !password) {
      return Promise.reject(new Error("Email and password are required."));
    }
    console.log(`Simulating registration for user: ${email}`);
    // Returns a mock user object upon successful registration.
    return Promise.resolve({ user: { email, uid: `user_${new Date().getTime()}` } });
  }

  /**
   * Logs in an existing user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<{user: {email: string, uid: string}}>}
   */
  static login(email, password) {
    if (!email || !password) {
      return Promise.reject(new Error("Email and password are required."));
    }
    console.log(`Simulating login for user: ${email}`);
    // Returns a mock user object.
    return Promise.resolve({ user: { email, uid: `user_${new Date().getTime()}` } });
  }

  /**
   * Handles login via a social provider.
   * @param {'Google' | 'Apple'} provider - The social login provider.
   * @returns {Promise<{user: {email: string, uid: string}}>}
   */
  static socialLogin(provider) {
    console.log(`Simulating login with ${provider}`);
    // Returns a mock user object from the social provider.
    return Promise.resolve({ user: { email: `user@${provider.toLowerCase()}.com`, uid: `${provider.toLowerCase()}_user_123` } });
  }
}

export default AuthService;
