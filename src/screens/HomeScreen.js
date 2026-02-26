import React, { useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  setSearchQuery,
  setSelectedCategory,
} from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, filteredItems, loading, error, searchQuery, selectedCategory } =
    useSelector((state) => state.products);

  const debounceTimer = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = useCallback(
    (text) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        dispatch(setSearchQuery(text));
      }, 300);
      dispatch(setSearchQuery(text));
    },
    [dispatch]
  );

  const handleCategorySelect = useCallback(
    (category) => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch]
  );

  const handleProductPress = useCallback(
    (product) => {
      navigation.navigate('ProductDetails', { product });
    },
    [navigation]
  );

  const categories = React.useMemo(() => {
    const cats = [...new Set(items.map((item) => item.category))];
    return ['All', ...cats];
  }, [items]);

  const renderProduct = useCallback(
    ({ item }) => <ProductCard product={item} onPress={handleProductPress} />,
    [handleProductPress]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  if (error && items.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>!</Text>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryText}>RETRY</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={handleSearch} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      {loading && items.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderProduct}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              tintColor="#888"
              colors={['#888']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No products found</Text>
              <Text style={styles.emptySubtitle}>
                Try a different search or category
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#000',
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 4,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 13,
    color: '#555',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  errorIcon: {
    fontSize: 40,
    color: '#333',
    fontWeight: '300',
    width: 64,
    height: 64,
    lineHeight: 64,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 32,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ccc',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  errorMessage: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 20,
  },
  retryButton: {
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 36,
    paddingVertical: 13,
    borderRadius: 6,
  },
  retryText: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#444',
    letterSpacing: 0.3,
  },
});

export default HomeScreen;
