import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PrimaryButton from '../components/PrimaryButton'
import { LinearGradient } from 'expo-linear-gradient'

const ResultScreen = ({ route, navigation }) => {
  const { name, score, totalQuestions } = route.params
  const [highScores, setHighScores] = useState([])
  const [hasNewHighScore, setHasNewHighScore] = useState(false)

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const storedHighScores = await AsyncStorage.getItem('highScores')
        setHighScores(storedHighScores ? JSON.parse(storedHighScores) : [])
      } catch (error) {
        console.error('Error loading high scores:', error)
      }
    }

    loadHighScores()
  }, [])

  const saveHighScores = useCallback(async () => {
    // useCallback for memoization
    try {
      await AsyncStorage.setItem('highScores', JSON.stringify(highScores))
    } catch (error) {
      console.error('Error saving high scores:', error)
    }
  }, [highScores])

  useEffect(() => {
    const updateHighScores = async () => {
      try {
        const storedHighScores = await AsyncStorage.getItem('highScores')
        const parsedHighScores = storedHighScores
          ? JSON.parse(storedHighScores)
          : []

        const newScore = { name, score, totalQuestions }

        const isDuplicate = parsedHighScores.some(
          (existingScore) =>
            existingScore.name === newScore.name &&
            existingScore.score === newScore.score &&
            existingScore.totalQuestions === newScore.totalQuestions,
        )

        if (!isDuplicate) {
          let updatedHighScores = [...parsedHighScores, newScore]

          // Sort scores by percentage, then alphabetically by name
          updatedHighScores.sort((a, b) => {
            const percentageA = a.score / a.totalQuestions
            const percentageB = b.score / b.totalQuestions
            return percentageB - percentageA || a.name.localeCompare(b.name)
          })

          // Keep only the top 5 scores
          updatedHighScores = updatedHighScores.slice(0, 5)

          await AsyncStorage.setItem(
            'highScores',
            JSON.stringify(updatedHighScores),
          )
          setHighScores(updatedHighScores)
          setHasNewHighScore(true)
        }
      } catch (error) {
        console.error('Error updating high scores:', error)
      }
    }

    updateHighScores()
  }, [name, score, totalQuestions])

  useEffect(() => {
    if (hasNewHighScore) {
      saveHighScores()
      setHasNewHighScore(false)
    }
  }, [hasNewHighScore, saveHighScores]) // Added saveHighScores to dependency array

  const playAgain = () => {
    navigation.navigate('Home')
  }

  const renderHighScoreItem = useCallback(
    ({ item, index }) => (
      <Text key={index} style={styles.highScoreItem}>
        {index + 1}. {item.name} - {item.score} / {item.totalQuestions} (
        {((item.score / item.totalQuestions) * 100).toFixed(1)}%)
      </Text>
    ),
    [],
  )

  return (
    <LinearGradient colors={['#FDF9D9', '#A2B965']} style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.title}>Quiz Results</Text>
        <Text style={styles.score}>Your Score</Text>
        <Text style={styles.score}>
          {score} / {totalQuestions} ({(score / totalQuestions) * 100}%)
        </Text>
      </View>
      <View style={styles.topScoresContainer}>
        <Text style={styles.highScoresTitle}>Top 5 High Scores</Text>
        <FlatList
          data={highScores}
          renderItem={renderHighScoreItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <PrimaryButton onPress={playAgain}>Play Again</PrimaryButton>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FDF9D9',
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#3a8d71',
    width: '70%',
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFCC33',
    borderBottomWidth: 2,
    borderBottomColor: '#FFCC33',
    paddingBottom: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  topScoresContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FCFCFC',
    width: '70%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  highScoresTitle: {
    fontSize: 20,
    fontWeight: 'bold',

    marginBottom: 10,
    color: '#3a8d71',
    borderBottomWidth: 2,
    borderBottomColor: '#3a8d71',
    paddingBottom: 10,
    width: '70%',
    textAlign: 'center',
  },
  highScoreItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    fontWeight: 'bold',
  },
})

export default ResultScreen
