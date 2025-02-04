import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const LoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#649e6c" />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoadingIndicator
