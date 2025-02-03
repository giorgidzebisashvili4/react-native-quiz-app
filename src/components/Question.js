import React, { useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'

const Question = ({ question, selectedAnswer, onAnswerPress }) => {
  if (!question) return null

  const answers = useMemo(() => {
    return [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5,
    )
  }, [question])

  const renderAnswer = ({ item: answer }) => (
    <View style={styles.answerWrapper}>
      <TouchableOpacity
        style={[
          styles.answerButton,
          selectedAnswer === answer && {
            backgroundColor:
              answer === question.correct_answer ? 'green' : 'red',
          },
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
      <Text style={styles.questionText}>{question.question}</Text>

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
  },
  listContainer: {
    width: 300,
    paddingVertical: 10,
  },
  answerWrapper: {
    // Style for the wrapper View
    width: '100%', // Take full width
    alignItems: 'center', // Center horizontally
  },
  answerButton: {
    width: '100%', // Now relative to answerWrapper
    backgroundColor: '#e0e0e0',
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
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Question
