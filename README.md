# Country Info Mobile App

## Overview

This mobile application allows users to view a list of countries, access detailed information about each country, and customize the app's theme (light/dark mode). The app fetches data from a REST API (Country API) and is designed to be responsive across various devices. The app is deployed on Appetize.io for easy testing.

## Features

- **Country List**: Fetch and display a scrollable list of countries.
- **Country Details**: Show detailed information about a selected country, including name, flag, capital, population, states/provinces, and more.
- **Theme Customization**: Toggle between light and dark themes across the entire app.
- **Search Functionality**: Filter countries by name using a search bar.
- **Responsive Design**: Ensure the app works seamlessly on different screen sizes.

## Dependencies/Packages Used

The project uses the following dependencies and packages:

- Core Dependencies
React: JavaScript library for building user interfaces.
React Native: Framework for building mobile apps using React.
Expo: Platform for building and deploying React Native apps.
React Navigation: Routing and navigation for React Native apps.
Axios: HTTP client for making API requests.

- UI and Styling
React Native Paper: Material Design component library for React Native.
Expo Vector Icons: Library for using vector icons in the app.
Expo Blur: Adds blur effects to components.
Expo Symbols: Provides a set of symbols and icons.

- State Management
Context API: Built-in React feature for managing global state (used for theme customization and app-wide state).

- Navigation
@react-navigation/native: Core navigation library.
@react-navigation/bottom-tabs: Bottom tab navigation implementation.

- Storage
@react-native-async-storage/async-storage: Persistent storage for saving user preferences (e.g., theme).

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- Expo CLI installed globally (`npm install -g expo-cli`).
- Fetch list of countires from [Country API](https://restcountries.com/v3.1/all).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/pelumiii1/country-info-app.git
   cd country-info-app
