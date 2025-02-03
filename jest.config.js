module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    '/node_modules/(?!(react-native|@react-native|react-native-gesture-handler|react-native-reanimated|react-native-screens|react-native-safe-area-context|@react-native-community/picker|react-native-svg|@react-native-async-storage/async-storage)/)',
  ],
  collectCoverage: true, // Enable coverage collection
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
