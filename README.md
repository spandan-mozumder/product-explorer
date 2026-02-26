# Mini Product Explorer

A React Native mobile application built with Expo that demonstrates authentication, product browsing, search/filtering, and favorites management.

## Features

### 1. Authentication Flow
- Login screen with username and password fields
- Input validation (username required, password min 6 characters)
- Integration with [DummyJSON Auth API](https://dummyjson.com/docs/auth)
- Token persistence using AsyncStorage
- Loading and error states with proper user feedback
- Logout functionality

### 2. Home Screen (Product Listing)
- Fetches products from [FakeStore API](https://fakestoreapi.com/products)
- Displays product image, title, price, and category
- **Search** – Filter products by title (debounced)
- **Category filter** – Horizontal scrollable chips
- Pull-to-refresh support
- Loading indicator and error state with retry button

### 3. Product Details Screen
- Full product information: image, title, price, category, description, and rating
- "Add to Favorites" toggle button

### 4. Favorites Screen
- Displays all favorited products
- Remove items from favorites
- Proper empty state UI
- Favorites persisted via AsyncStorage

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native (Expo) | Core framework |
| Redux Toolkit | State management |
| React Navigation | Navigation (Stack + Bottom Tab) |
| Axios | HTTP client |
| AsyncStorage | Persistent storage |

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── CategoryFilter.js
│   ├── ProductCard.js
│   └── SearchBar.js
├── navigation/        # Navigation configuration
│   └── AppNavigator.js
├── screens/           # App screens
│   ├── FavoritesScreen.js
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   └── ProductDetailsScreen.js
├── services/          # API service layer
│   └── api.js
└── store/             # Redux store
    ├── index.js
    └── slices/
        ├── authSlice.js
        ├── favoritesSlice.js
        └── productsSlice.js
```

## Redux State Shape

```
{
  auth: {
    token, isLoggedIn, loading, error, user
  },
  products: {
    items, filteredItems, loading, error, searchQuery, selectedCategory
  },
  favorites: {
    items
  }
}
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio / Xcode for emulators (or Expo Go on a physical device)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd MiniProductExplorer

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running

- **Android:** Press `a` in the terminal or scan the QR code with Expo Go
- **iOS:** Press `i` in the terminal or scan the QR code with Expo Go
- **Web:** Press `w` in the terminal

### Demo Credentials

| Field | Value |
|---|---|
| Username | `emilys` |
| Password | `emilyspass` |

## Building APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for Android
eas build --platform android --profile preview
```

## API Endpoints

- **Auth:** `POST https://dummyjson.com/auth/login`
- **Products:** `GET https://fakestoreapi.com/products`

## Bonus Features Implemented

- ✅ Persist login token using AsyncStorage
- ✅ Persist favorites using AsyncStorage
- ✅ Debounced search
- ✅ Logout functionality
- ✅ Polished UI with consistent design system
