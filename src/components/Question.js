import React, { useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { decode } from 'html-entities' // Import to decode special characters

const Question = ({ question, selectedAnswer, onAnswerPress }) => {
  if (!question) return null

  const shuffleArray = (array) => {
    let newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const answers = useMemo(() => {
    return shuffleArray(
      [...question.incorrect_answers, question.correct_answer].map(decode),
    )
  }, [question])

  const renderAnswer = ({ item: answer }) => (
    <View style={styles.answerWrapper}>
      <TouchableOpacity
        style={[
          styles.answerButton,
          selectedAnswer && {
            backgroundColor:
              answer === decode(question.correct_answer)
                ? '#FFCC33'
                : '#ff4d4d',
          },
          selectedAnswer === answer && { opacity: 0.7 },
        ]}
        onPress={() => onAnswerPress(answer)}
        disabled={selectedAnswer !== null}
      >
        <Text style={styles.answerText}>{answer}</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{decode(question.question)}</Text>

      <FlatList
        data={answers}
        renderItem={renderAnswer}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  listContainer: {
    width: 250,
    paddingVertical: 10,
  },
  answerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  answerButton: {
    width: '100%',
    backgroundColor: '#3a8d71',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  answerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Question
