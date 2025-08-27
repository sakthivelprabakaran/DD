import { StyleSheet } from 'react-native';
import { colors } from './colors';

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

// Use StyleSheet.create for performance optimizations and style validation.
export const fontStyles = StyleSheet.create({
  postTitle: {
    fontFamily: fonts.primary.bold,
    fontSize: fontSizes.title,
    color: colors.text.primary,
  },
  username: {
    fontFamily: fonts.primary.bold,
    fontSize: fontSizes.body,
  },
  description: {
    fontFamily: fonts.primary.regular,
    fontSize: fontSizes.body,
    color: colors.text.secondary,
  },
  buttonText: {
    fontFamily: fonts.primary.bold,
    fontSize: fontSizes.body,
    color: colors.white,
  },
});
