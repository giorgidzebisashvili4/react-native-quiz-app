import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import AppNavigator from './src/AppNavigator'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </SafeAreaView>
  )
}
