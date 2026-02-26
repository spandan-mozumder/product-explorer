import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { restoreToken } from './src/store/slices/authSlice';
import { restoreFavorites } from './src/store/slices/favoritesSlice';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreToken());
    dispatch(restoreFavorites());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
