import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}
      activeOpacity={0.6}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {product.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{product.rating.rate} ★</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 6,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  imageContainer: {
    width: 100,
    height: 120,
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 100,
  },
  info: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 9,
    fontWeight: '600',
    color: '#555',
    letterSpacing: 2,
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ddd',
    lineHeight: 20,
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  ratingContainer: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
    letterSpacing: 0.5,
  },
});

export default ProductCard;
