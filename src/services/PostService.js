// A service dedicated to handling post-related data.

const mockPosts = [
  {
    id: '1',
    author: {
      username: 'GadgetGuru',
      avatarUrl: 'https://i.pravatar.cc/100?u=gadgetguru',
    },
    title: 'Exploring the new M3 MacBook Air',
    description: 'Just spent a week with the M3 MacBook Air. It is faster than I expected, but there are a few key things to consider before you upgrade... The screen is fantastic, and the battery life is a true all-day experience. However, the port situation is still a bit of a letdown for a "pro" machine.',
    likes: 256,
    commentCount: 32,
    comments: [
      { id: 'c1', author: { username: 'ReplyGuy' }, text: 'Great review! How does it handle video editing?' },
      { id: 'c2', author: { username: 'GadgetGuru' }, text: 'Thanks! For 4K editing, it is surprisingly capable, but you will hear the fans spin up on longer projects.' },
    ],
  },
  {
    id: '2',
    author: {
      username: 'RetroTech',
      avatarUrl: 'https://i.pravatar.cc/100?u=retrotech',
    },
    title: 'A week with the Rabbit R1... my thoughts.',
    description: 'The Rabbit R1 is an interesting AI gadget, but does it live up to the hype? Here is a breakdown of my experience, the good and the bad.',
    likes: 512,
    comments: 128,
  },
  {
    id: '3',
    author: {
      username: 'MobileMaverick',
      avatarUrl: 'https://i.pravatar.cc/100?u=mobilemaverick',
    },
    title: 'Is the Pixel Fold a true competitor?',
    description: 'After a month with the new Pixel Fold, I have some thoughts on the display, battery life, and whether it is a true competitor in the foldable market.',
    likes: 1024,
    comments: 256,
  },
];

class PostService {
  /**
   * Fetches the list of posts for the main feed.
   * @returns {Promise<Array>} A promise that resolves to an array of post objects.
   */
  static getFeedPosts() {
    console.log('Fetching feed posts...');
    return Promise.resolve(mockPosts);
  }

  /**
   * Fetches a single post by its ID.
   * @param {string} postId - The ID of the post to fetch.
   * @returns {Promise<object|null>} A promise that resolves to the post object or null if not found.
   */
  static getPostById(postId) {
    console.log(`Fetching post with ID: ${postId}`);
    const post = mockPosts.find(p => p.id === postId);
    return Promise.resolve(post || null);
  }

  /**
   * Simulates creating a new post.
   * @param {object} postData - The data for the new post, e.g., { title, content }.
   * @returns {Promise<object>} A promise that resolves to the newly created post object.
   */
  static createPost(postData) {
    console.log('Creating a new post with data:', postData);
    const newPost = {
      id: `post_${new Date().getTime()}`,
      author: {
        username: 'CurrentUser', // In a real app, this would be the logged-in user
        avatarUrl: 'https://i.pravatar.cc/100?u=currentuser',
      },
      ...postData,
      likes: 0,
      comments: 0,
    };
    // In a real app, this would add the new post to the database.
    // We could add it to our mockPosts array here to simulate persistence.
    mockPosts.unshift(newPost);
    return Promise.resolve(newPost);
  }
}

export default PostService;
