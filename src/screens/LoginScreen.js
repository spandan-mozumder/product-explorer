import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../store/slices/authSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = () => {
    dispatch(clearError());
    if (validate()) {
      dispatch(login({ username: username.trim(), password }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <View style={styles.logoMark}>
            <Text style={styles.logoLetter}>P</Text>
          </View>
          <Text style={styles.title}>PRODUCT EXPLORER</Text>
          <View style={styles.titleLine} />
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>USERNAME</Text>
            <TextInput
              style={[
                styles.input,
                validationErrors.username && styles.inputError,
              ]}
              placeholder="Enter username"
              placeholderTextColor="#555"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (validationErrors.username) {
                  setValidationErrors((prev) => ({ ...prev, username: null }));
                }
              }}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {validationErrors.username && (
              <Text style={styles.errorText}>{validationErrors.username}</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={[
                styles.input,
                validationErrors.password && styles.inputError,
              ]}
              placeholder="Enter password"
              placeholderTextColor="#555"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (validationErrors.password) {
                  setValidationErrors((prev) => ({ ...prev, password: null }));
                }
              }}
              secureTextEntry
            />
            {validationErrors.password && (
              <Text style={styles.errorText}>{validationErrors.password}</Text>
            )}
          </View>

          {error && (
            <View style={styles.apiErrorContainer}>
              <Text style={styles.apiErrorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.buttonText}>SIGN IN</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.hintContainer}>
          <Text style={styles.hintTitle}>DEMO CREDENTIALS</Text>
          <View style={styles.hintRow}>
            <Text style={styles.hintLabel}>Username</Text>
            <Text style={styles.hintValue}>emilys</Text>
          </View>
          <View style={styles.hintRow}>
            <Text style={styles.hintLabel}>Password</Text>
            <Text style={styles.hintValue}>emilyspass</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 52,
  },
  logoMark: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  logoLetter: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 6,
    marginBottom: 12,
  },
  titleLine: {
    width: 40,
    height: 1,
    backgroundColor: '#333',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    color: '#555',
    letterSpacing: 1,
  },
  formContainer: {
    marginBottom: 40,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: '#555',
    letterSpacing: 3,
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
    letterSpacing: 0.5,
  },
  inputError: {
    borderBottomColor: '#888',
  },
  errorText: {
    color: '#999',
    fontSize: 12,
    marginTop: 8,
    letterSpacing: 0.3,
  },
  apiErrorContainer: {
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 6,
    padding: 14,
    marginBottom: 8,
  },
  apiErrorText: {
    color: '#bbb',
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 4,
  },
  hintContainer: {
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    paddingTop: 28,
  },
  hintTitle: {
    fontSize: 9,
    fontWeight: '600',
    color: '#444',
    letterSpacing: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  hintRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  hintLabel: {
    fontSize: 13,
    color: '#444',
    letterSpacing: 0.5,
  },
  hintValue: {
    fontSize: 13,
    color: '#777',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});

export default LoginScreen;
