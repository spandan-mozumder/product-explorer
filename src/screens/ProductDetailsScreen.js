import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.metaRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {product.category.toUpperCase()}
            </Text>
          </View>
          <View style={styles.metaRight}>
            {product.rating && (
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingValue}>{product.rating.rate} ★</Text>
                <Text style={styles.ratingCount}>
                  ({product.rating.count})
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={[
                styles.favIconButton,
                isFavorite && styles.favIconButtonActive,
              ]}
              onPress={handleToggleFavorite}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.favIconText,
                isFavorite && styles.favIconTextActive,
              ]}>
                {isFavorite ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>{product.title}</Text>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <View style={styles.divider} />

        <Text style={styles.descriptionLabel}>DESCRIPTION</Text>
        <Text style={styles.description}>{product.description}</Text>


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingBottom: 50,
  },
  imageContainer: {
    backgroundColor: '#fff',
    paddingVertical: 36,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 10,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
  },
  detailsContainer: {
    padding: 24,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  favIconButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favIconButtonActive: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  favIconText: {
    fontSize: 18,
    color: '#666',
  },
  favIconTextActive: {
    color: '#e00',
  },
  categoryBadge: {
    borderWidth: 1,
    borderColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ccc',
    marginRight: 4,
    letterSpacing: 0.5,
  },
  ratingCount: {
    fontSize: 11,
    color: '#555',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#eee',
    lineHeight: 30,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#1a1a1a',
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#555',
    marginBottom: 12,
    letterSpacing: 3,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    color: '#888',
    marginBottom: 32,
    letterSpacing: 0.3,
  },

});

export default ProductDetailsScreen;
