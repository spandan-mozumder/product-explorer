import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.chip,
              selectedCategory === category && styles.chipActive,
            ]}
            onPress={() => onSelectCategory(category)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === category && styles.chipTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 4,
    backgroundColor: 'transparent',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  chipActive: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  chipTextActive: {
    color: '#000',
    fontWeight: '700',
  },
});

export default CategoryFilter;
