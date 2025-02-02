import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'

import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native'
import { fetchCategories } from '../utils/api'

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      const categoryList = await fetchCategories()
      setCategories(categoryList)
      setSelectedCategory(categoryList[0]?.id || null)
      setLoading(false)
    }

    loadCategories()
  }, [])

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Quiz Options</Text>

      {/* Category Picker */}
      <Text>Category:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={setSelectedCategory}
      >
        {categories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
        ))}
      </Picker>

      {/* Difficulty Picker */}
      <Text>Difficulty:</Text>
      <Picker
        selectedValue={selectedDifficulty}
        onValueChange={setSelectedDifficulty}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>

      <Button
        title="Start Quiz"
        onPress={() =>
          navigation.navigate('Quiz', {
            category: selectedCategory,
            difficulty: selectedDifficulty,
          })
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
})

export default HomeScreen
