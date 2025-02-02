import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage' //

const ResultScreen = ({ route, navigation }) => {
  const { score, totalQuestions } = route.params
  const [highScores, setHighScores] = useState([])

  useEffect(() => {
    // Load high scores from AsyncStorage
    const loadHighScores = async () => {
      try {
        const storedHighScores = await AsyncStorage.getItem('highScores')
        if (storedHighScores) {
          setHighScores(JSON.parse(storedHighScores))
        }
      } catch (error) {
        console.error('Error loading high scores:', error)
      }
    }

    loadHighScores()
  }, [])

  useEffect(() => {
    // Save high scores to AsyncStorage
    const saveHighScores = async () => {
      try {
        await AsyncStorage.setItem('highScores', JSON.stringify(highScores))
      } catch (error) {
        console.error('Error saving high scores:', error)
      }
    }

    saveHighScores()
  }, [highScores])

  useEffect(() => {
    // Update high scores and sort
    const updateHighScores = () => {
      const newScore = { score, totalQuestions }
      const updatedHighScores = [...highScores, newScore]
        .sort((a, b) => b.score / b.totalQuestions - a.score / a.totalQuestions) // Sort by percentage
        .slice(0, 10) // Keep only top 10 scores

      setHighScores(updatedHighScores)
    }

    updateHighScores()
  }, [score, totalQuestions])

  const playAgain = () => {
    navigation.navigate('Home') // Navigate back to HomeScreen to play again
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Results</Text>
      <Text style={styles.score}>
        Score: {score} / {totalQuestions} ({(score / totalQuestions) * 100}%)
      </Text>

      <Text style={styles.highScoresTitle}>High Scores:</Text>
      {highScores.map((highScore, index) => (
        <Text key={index} style={styles.highScoreItem}>
          {/* {index < 9 ? `${index + 1}.` : `${index + 1}.`}{' '} */}
          {/* Conditional formatting */}
          {highScore.score} / {highScore.totalQuestions} (
          {(highScore.score / highScore.totalQuestions) * 100}%)
        </Text>
      ))}

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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
  highScoresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  highScoreItem: {
    fontSize: 16,
    marginBottom: 5,
  },
})

export default ResultScreen
