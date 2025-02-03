import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
      const newScore = { name, score, totalQuestions }
      let updatedHighScores = [...highScores]

      const isDuplicate = updatedHighScores.some(
        (existingScore) =>
          existingScore.name === newScore.name &&
          existingScore.score === newScore.score &&
          existingScore.totalQuestions === newScore.totalQuestions,
      )

      if (!isDuplicate) {
        updatedHighScores.push(newScore)
        updatedHighScores.sort((a, b) => {
          const percentageA = a.score / a.totalQuestions
          const percentageB = b.score / b.totalQuestions
          if (percentageB !== percentageA) {
            return percentageB - percentageA
          }
          return a.name.localeCompare(b.name)
        })
        updatedHighScores = updatedHighScores.slice(0, 5)
        setHighScores(updatedHighScores)
        await saveHighScores()
        setHasNewHighScore(true)
      }
    }

    updateHighScores()
  }, [name, score, totalQuestions, highScores, saveHighScores]) // Removed highScores from dependency array

  useEffect(() => {
    if (hasNewHighScore) {
      saveHighScores()
      setHasNewHighScore(false)
    }
  }, [hasNewHighScore, saveHighScores]) // Added saveHighScores to dependency array

  const playAgain = () => {
    navigation.navigate('Home')
  }
  const renderHighScoreItem = ({ item, index }) => (
    <Text key={index} style={styles.highScoreItem}>
      {index + 1}. {item.name} - {item.score} / {item.totalQuestions} (
      {(item.score / item.totalQuestions) * 100}%)
    </Text>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Results</Text>
      <Text style={styles.score}>
        Score: {score} / {totalQuestions} ({(score / totalQuestions) * 100}%)
      </Text>

      <Text style={styles.highScoresTitle}>Top 5 High Scores:</Text>
      <FlatList
        data={highScores}
        renderItem={renderHighScoreItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button title="Play Again" onPress={playAgain} />
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007bff',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  highScoresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#0056b3',
  },
  highScoreItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  playAgainButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  playAgainText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default ResultScreen
