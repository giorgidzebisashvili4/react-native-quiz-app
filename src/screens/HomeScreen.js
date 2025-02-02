import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Quiz App!</Text>
      <Button title="Start Quiz" onPress={() => navigation.navigate('Quiz')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
})

export default HomeScreen
