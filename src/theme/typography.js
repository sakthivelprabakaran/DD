// Using system fonts as a proxy for SF Pro (iOS) and Google Sans/Roboto (Android)
// This ensures the app feels native on each platform.
export const fonts = {
  primary: {
    regular: 'System',
    bold: 'System-Bold',
  },
};

export const fontSizes = {
  largeTitle: 34,
  title: 24,
  subtitle: 20,
  body: 16,
  caption: 12,
};

export const fontStyles = {
  postTitle: {
    fontFamily: fonts.primary.bold,
    fontSize: fontSizes.title,
    color: '#212529', // From colors.js text.primary
  },
  username: {
    fontFamily: fonts.primary.bold,
    fontSize: fontSizes.body,
  },
  description: {
    fontFamily: fonts.primary.regular,
    fontSize: fontSizes.body,
  },
  buttonText: {
    fontFamily: fonts.primary.bold,
    fontSize: fontSizes.body,
    color: '#FFFFFF', // White text for buttons
  },
};
