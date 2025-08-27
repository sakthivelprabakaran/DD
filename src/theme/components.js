import { colors } from './colors';
import { fontStyles } from './typography';

export const buttonStyles = {
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4, // For Android shadow
    alignItems: 'center',
  },
  text: fontStyles.buttonText,
};

export const iconStyles = {
    size: 24,
    color: colors.text.primary,
};

export const cardStyles = {
    container: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
};
