import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { fetchCategories } from '../services/api' // Import your API function

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('')
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
    if (!name.trim()) {
      alert('Please enter your name before starting the quiz.')
      return
    }

    navigation.navigate('Quiz', { name, category, difficulty })
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

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Category Picker */}
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

      {/* Difficulty Picker */}
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

      {/* Start Quiz Button */}
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
  inputContainer: {
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
    elevation: 3,
  },
  input: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingLeft: 8,
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
    elevation: 3,
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
})

export default HomeScreen
