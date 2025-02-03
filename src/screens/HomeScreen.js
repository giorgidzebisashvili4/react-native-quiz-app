import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { fetchCategories } from '../utils/api' // Import your API function

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories()
        setCategories(fetchedCategories)

        if (fetchedCategories && fetchedCategories.length > 0) {
          // Check if fetchedCategories is not null or undefined and has elements
          setCategory(fetchedCategories[0].id)
        }
      } catch (err) {
        console.error('Error loading categories:', err)
        setError(
          'Error loading categories. Please check your network connection.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  const startQuiz = () => {
    navigation.navigate('Quiz', { category, difficulty })
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Settings</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Category:</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Any Category" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Difficulty:</Text>
        <Picker
          selectedValue={difficulty}
          style={styles.picker}
          onValueChange={(itemValue) => setDifficulty(itemValue)}
        >
          <Picker.Item label="Any Difficulty" value="" />
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>
      </View>

      <Button title="Start Quiz" onPress={startQuiz} color="#007bff" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  pickerContainer: {
    width: '90%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  error: {
    color: '#ff4d4d',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  startButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '60%',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default HomeScreen
