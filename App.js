import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import AppNavigator from './src/AppNavigator'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
