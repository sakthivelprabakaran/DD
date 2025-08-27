import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

/**
 * A reusable search bar component.
 * @param {object} props
 * @param {function(string): void} props.onSearch - Callback function when the user submits the search.
 */
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for Discussions..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#f0f2f5',
  },
  input: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default SearchBar;
