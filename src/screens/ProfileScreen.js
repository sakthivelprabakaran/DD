import { theme } from '../theme/theme';
import { buttonStyles } from '../theme/components';
import { fontStyles } from '../theme/typography';

// ProfileScreen.js
// This component displays a user's profile, including their bio, stats,
// devices, and recent activity.

const ProfileScreen = () => {
  // This object simulates the complete UI structure of the Profile Screen.
  const UIElements = {
    profileHeader: {
      profilePhotoUrl: 'path/to/large_profile_photo.png',
      username: 'GadgetGuru',
      usernameStyle: fontStyles.largeTitle,
      tagline: 'I’m all ears when it comes to checking out the latest tech gadgets!',
      taglineStyle: fontStyles.body,
    },
    stats: {
      followers: { label: 'Followers', count: 1250 },
      following: { label: 'Following', count: 150 },
      discussions: { label: 'Discussions', count: 22 },
    },
    connectButton: {
      text: 'Follow', // This text would be conditional, e.g., 'Following'
      style: buttonStyles.primary,
    },
    currentlyUsingSection: {
      title: 'Currently Using',
      devices: [
        {
          icon: 'smartphone', // Material icon name
          name: 'Pixel 8 Pro',
          yearsOfUse: '1 year',
        },
        {
          icon: 'laptop-mac', // Material icon name
          name: 'M3 MacBook Air',
          yearsOfUse: '0.5 years',
        },
      ],
    },
    recentPostsSection: {
      title: 'Recent Posts',
      posts: [
        {
          postTitle: 'Exploring the new M3 MacBook Air',
          // Each item would be a clickable card navigating to the post
        },
        {
          postTitle: 'A week with the Rabbit R1... thoughts.',
        },
      ],
    },
    creatorDashboardButton: {
      // This button is conditionally rendered if the user is viewing their own
      // profile and meets the criteria (e.g., 1000+ followers).
      text: 'Creator Dashboard',
      style: buttonStyles.secondary,
      isVisible: true, // This would be determined by application logic
    }
  };

  return UIElements;
};

export default ProfileScreen;
