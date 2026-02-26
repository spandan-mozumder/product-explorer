import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../store/slices/favoritesSlice';

const FavoritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const handleRemove = useCallback(
    (productId) => {
      dispatch(removeFavorite(productId));
    },
    [dispatch]
  );

  const handleProductPress = useCallback(
    (product) => {
      navigation.navigate('ProductDetails', { product });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.6}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.category}>{item.category.toUpperCase()}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemove(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.removeIcon}>×</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    ),
    [handleProductPress, handleRemove]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Text style={styles.emptyIcon}>♡</Text>
        </View>
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptySubtitle}>
          Products you save will appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  listContent: {
    paddingVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#000',
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyIcon: {
    fontSize: 32,
    color: '#333',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#888',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 6,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    height: 90,
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 70,
  },
  info: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 8,
  },
  category: {
    fontSize: 8,
    fontWeight: '600',
    color: '#555',
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ddd',
    lineHeight: 18,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  removeIcon: {
    fontSize: 20,
    color: '#666',
    fontWeight: '300',
    marginTop: -1,
  },
});

export default FavoritesScreen;
