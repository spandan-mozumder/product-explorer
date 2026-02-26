import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeList"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="ProductDetails"
      component={ProductDetailsScreen}
      options={{
        title: 'Details',
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '500', fontSize: 15, letterSpacing: 1 },
        headerShadowVisible: false,
      }}
    />
  </HomeStack.Navigator>
);

const FavoritesStackNavigator = () => (
  <FavoritesStack.Navigator>
    <FavoritesStack.Screen
      name="FavoritesList"
      component={FavoritesScreen}
      options={{ headerShown: false }}
    />
    <FavoritesStack.Screen
      name="ProductDetails"
      component={ProductDetailsScreen}
      options={{
        title: 'Details',
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '500', fontSize: 15, letterSpacing: 1 },
        headerShadowVisible: false,
      }}
    />
  </FavoritesStack.Navigator>
);

const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => dispatch(logout())}
      style={styles.logoutButton}
      activeOpacity={0.6}
    >
      <Text style={styles.logoutText}>LOGOUT</Text>
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 1,
          borderTopColor: '#111',
          height: 56,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        },
        headerStyle: {
          backgroundColor: '#000',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#111',
        },
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 15,
          color: '#fff',
          letterSpacing: 2,
          textTransform: 'uppercase',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 18, color }}>◻</Text>
          ),
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStackNavigator}
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 18, color }}>♡</Text>
          ),
          tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#fff',
            color: '#000',
            fontSize: 10,
            fontWeight: '700',
            minWidth: 18,
            height: 18,
            lineHeight: 18,
          },
          headerRight: () => <LogoutButton />,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animationTypeForReplace: 'pop' }}
        />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  logoutText: {
    color: '#888',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
  },
});

export default AppNavigator;
