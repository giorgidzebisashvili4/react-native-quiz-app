import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { fetchQuestions } from '../services/api'
import Question from '../components/Question'

const QuizScreen = ({ route, navigation }) => {
  const { category, difficulty, name } = route.params
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
      setScore(
        (prevScore) =>
          prevScore + (answer === currentQuestion.correct_answer ? 1 : 0),
      )

      setTimeout(() => {
        setSelectedAnswer(null)
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
        } else {
          navigation.navigate('Result', {
            score: score + (answer === currentQuestion.correct_answer ? 1 : 0), // Ensure updated score
            totalQuestions: questions.length,
            name,
          })
        }
      }, 500)
    },
    [currentQuestionIndex, questions.length, navigation, score],
  )

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#649e6c" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <PrimaryButton onPress={() => navigation.goBack()}>
          Try Again
        </PrimaryButton>
      </View>
    )
  }

  if (!currentQuestion) {
    return null
  }

  // Calculate progress percentage
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>

      {/* Question Counter */}
      <Text style={styles.questionCounter}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>

      {/* Question Component */}
      <Question
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswerPress={handleAnswerPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FDF9D9',
  },
  progressBarContainer: {
    width: '100%',
    height: 15,
    backgroundColor: '#ccc',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 60,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3a8d71',
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
