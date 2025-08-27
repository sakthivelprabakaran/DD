import { colors } from './colors';
import { fonts, fontSizes, fontStyles } from './typography';

export const theme = {
  colors,
  fonts,
  fontSizes,
  fontStyles,
  // The gradient background style to be used across the app
  gradientBackground: {
    colors: [colors.background.start, colors.background.end],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
};
