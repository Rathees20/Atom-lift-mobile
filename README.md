# Atom Lift Mobile App

A React Native Expo app with TypeScript support, featuring login and home screens.

## Features

- **TypeScript**: Full TypeScript support with proper type definitions
- **Login Screen**: Clean login form with email/password validation
- **Home Screen**: Dashboard with menu cards, action buttons, and status display
- **Navigation**: Seamless navigation between login and home screens
- **Modern UI**: Beautiful design matching the provided image
- **Type Safety**: Comprehensive type definitions for better development experience

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
```bash
# For Android
npm run android

# For iOS
npm run ios

# For Web
npm run web
```

## Project Structure

```
src/
├── screens/
│   ├── LoginScreen.tsx   # Login form with validation (TypeScript)
│   └── HomeScreen.tsx    # Home dashboard (TypeScript)
├── components/           # Reusable components
├── assets/              # Images and other assets
types/
└── index.ts             # TypeScript type definitions
```

## Features

### Login Screen
- Email and password input fields
- Form validation
- Password visibility toggle
- Loading states
- Responsive design

### Home Screen
- Header with time, status icons, and app name
- 2x2 grid of menu cards (Tickets, Routine Services, Customers, AMC)
- Action buttons (Mark Attendance In, Work Check In)
- Status display with location icon
- Modern card-based design

## Customization

You can customize the app by:
- Modifying colors in the StyleSheet objects
- Adding new menu items in the HomeScreen
- Implementing actual API calls for login
- Adding more screens and navigation

## Dependencies

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Vector Icons
- React Native Safe Area Context
- React Native Gesture Handler

## TypeScript Features

- **Type Safety**: All components have proper TypeScript interfaces
- **Navigation Types**: Typed navigation parameters
- **State Management**: Typed state variables and handlers
- **Props Validation**: All component props are properly typed
- **Event Handlers**: Typed event handlers for better IDE support
