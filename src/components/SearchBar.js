import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{'\u2315'}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor="#555"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 6,
    borderRadius: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#1e1e1e',
  },
  icon: {
    fontSize: 20,
    color: '#555',
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#ddd',
    letterSpacing: 0.3,
  },
});

export default SearchBar;
