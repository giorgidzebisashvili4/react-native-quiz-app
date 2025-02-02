import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { fetchQuestions } from '../utils/api'

const QuizScreen = ({ route, navigation }) => {
  const { category, difficulty } = route.params
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true)
      const quizData = await fetchQuestions(10, category, difficulty)

      if (quizData.length === 0) {
        setError('No questions found. Try a different category or difficulty.')
      } else {
        setQuestions(quizData)
      }

      setLoading(false)
    }

    loadQuestions()
  }, [category, difficulty])

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Started</Text>
      <Text>Total Questions: {questions.length}</Text>
      {/* Next step: Render questions */}
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
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  errorText: { color: 'red', fontSize: 18 },
})

export default QuizScreen
