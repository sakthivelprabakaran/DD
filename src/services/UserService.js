// A service for handling user-related data.

const mockUser = {
  id: 'user_123',
  username: 'GadgetGuru',
  tagline: 'I’m all ears when it comes to checking out the latest tech gadgets!',
  avatarUrl: 'https://i.pravatar.cc/150?u=gadgetguru',
  stats: {
    followers: 1250,
    following: 150,
    discussions: 22,
  },
  devices: [
    { id: 'dev_1', name: 'Pixel 8 Pro', yearsOfUse: '1 year', category: 'Smartphone' },
    { id: 'dev_2', name: 'M3 MacBook Air', yearsOfUse: '0.5 years', category: 'Laptop' },
    { id: 'dev_3', name: 'Sony WH-1000XM5', yearsOfUse: '2 years', category: 'Headphones' },
  ],
  recentPosts: [
    { id: 'post_1', title: 'Exploring the new M3 MacBook Air' },
    { id: 'post_2', title: 'A week with the Rabbit R1... my thoughts.' },
  ],
};

class UserService {
  /**
   * Fetches a user's profile data.
   * @param {string} userId - The ID of the user to fetch.
   * @returns {Promise<object>} A promise that resolves to the user object.
   */
  static getUserProfile(userId) {
    console.log(`Fetching profile for user: ${userId}`);
    // In a real app, userId would be used to fetch a specific user from the backend.
    return Promise.resolve(mockUser);
  }

  /**
   * Simulates updating a user's profile data.
   * @param {string} userId - The ID of the user to update.
   * @param {object} profileData - The data to update, e.g., { tagline, username }.
   * @returns {Promise<object>} A promise that resolves to the updated user object.
   */
  static updateUserProfile(userId, profileData) {
    console.log(`Updating profile for user ${userId} with data:`, profileData);
    // In a real app, this would send a PATCH request to the backend.
    // Here, we'll just update our mock object to simulate the change.
    mockUser.tagline = profileData.tagline ?? mockUser.tagline;
    mockUser.username = profileData.username ?? mockUser.username;
    return Promise.resolve(mockUser);
  }

  static addDevice(userId, deviceData) {
    console.log(`Adding device for user ${userId}:`, deviceData);
    const newDevice = { id: `dev_${new Date().getTime()}`, ...deviceData };
    mockUser.devices.push(newDevice);
    return Promise.resolve(newDevice);
  }

  static deleteDevice(userId, deviceId) {
    console.log(`Deleting device ${deviceId} for user ${userId}`);
    mockUser.devices = mockUser.devices.filter(d => d.id !== deviceId);
    return Promise.resolve({ success: true });
  }
}

export default UserService;
