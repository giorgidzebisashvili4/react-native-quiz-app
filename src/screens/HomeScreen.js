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
import PrimaryButton from '../components/PrimaryButton'
import { LinearGradient } from 'expo-linear-gradient'

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
        setCategory(fetchedCategories?.[0]?.id || '')
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
      return alert('Please enter your name before starting the quiz.')
    }
    navigation.navigate('Quiz', { name, category, difficulty })
  }

  return (
    <LinearGradient colors={['#FDF9D9', '#A2B965']} style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#649e6c" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <PrimaryButton onPress={() => setLoading(true)}>Retry</PrimaryButton>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Quiz App</Text>

          {/* Name Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#FFCC33"
              value={name}
              onChangeText={setName}
              maxLength={20}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Category Picker */}
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Category</Text>
            <Picker
              selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              {categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
            </Picker>
          </View>

          {/* Difficulty Picker */}
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Difficulty</Text>
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
          <PrimaryButton onPress={startQuiz}>Start Quiz</PrimaryButton>
        </>
      )}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#649e6c',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
    backgroundColor: '#3a8d71',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 50,
    width: '100%',
    color: '#FFCC33',
    borderBottomWidth: 2,
    borderBottomColor: '#FFCC33',
    fontSize: 20,
    paddingLeft: 8,
    fontWeight: 'bold',
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 130,
    width: '90%',
    marginBottom: 20,
    backgroundColor: '#3a8d71',
    borderRadius: 8,
    paddingTop: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFCC33',
    borderBottomWidth: 2,
    borderBottomColor: '#FFCC33',
    paddingBottom: 13,
  },
  picker: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    width: '100%',
    paddingEnd: 50,
  },
  error: {
    color: '#ff4d4d',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
})

export default HomeScreen
