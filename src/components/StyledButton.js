import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { fontStyles } from '../theme/typography';

/**
 * A reusable button component with predefined primary and secondary styles.
 * @param {object} props
 * @param {string} props.title - The text to display on the button.
 * @param {function} props.onPress - The function to call when the button is pressed.
 * @param {object} [props.style] - Custom styles to override the base styles.
 * @param {object} [props.textStyle] - Custom styles for the button text.
 * @param {'primary' | 'secondary'} [props.variant='primary'] - The button style variant.
 */
const StyledButton = ({ title, onPress, style, textStyle, variant = 'primary' }) => {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[fontStyles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // iOS shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Android shadow
    elevation: 5,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 4,
  },
});

export default StyledButton;
