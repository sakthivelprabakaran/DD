import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

/**
 * A reusable Card component for wrapping content.
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 * @param {object} [props.style] - Custom styles to override the base card styles.
 */
const Card = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    // iOS shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Android shadow
    elevation: 6,
    marginBottom: 16, // Default margin between cards
  },
});

export default Card;
