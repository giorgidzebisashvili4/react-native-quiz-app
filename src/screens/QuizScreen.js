import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { fetchQuestions } from '../services/api'
import Question from '../components/Question'

const QuizScreen = ({ route, navigation }) => {
  const { category, difficulty } = route.params
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true)
      try {
        const quizData = await fetchQuestions(10, category, difficulty)
        if (quizData.length === 0) {
          setError(
            'No questions found. Try a different category or difficulty.',
          )
        } else {
          setQuestions(quizData)
        }
      } catch (err) {
        setError(
          'Error fetching questions. Please check your internet connection.',
        )
        console.error('Error fetching questions:', err)
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [category, difficulty])

  const currentQuestion = useMemo(() => {
    return questions.length > 0 ? questions[currentQuestionIndex] : null
  }, [questions, currentQuestionIndex])

  const handleAnswerPress = useCallback(
    (answer) => {
      setSelectedAnswer(answer)
      if (answer === currentQuestion.correct_answer) {
        setScore((prevScore) => prevScore + 1)
      }

      setTimeout(() => {
        setSelectedAnswer(null)
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
        } else {
          navigation.navigate('Result', {
            score,
            totalQuestions: questions.length,
          })
        }
      }, 500)
    },
    [currentQuestionIndex, questions.length, navigation],
  )

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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <View style={styles.container}>
      <Question
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswerPress={handleAnswerPress}
      />

      <Text style={styles.questionCounter}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>
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
  questionCounter: {
    marginTop: 20,
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 18,
    textAlign: 'center',
  },
})

export default QuizScreen
