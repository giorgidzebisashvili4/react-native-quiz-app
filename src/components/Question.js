import React, { useMemo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Question = ({ question, selectedAnswer, onAnswerPress }) => {
  if (!question) return null // Prevent rendering if question is undefined

  // Shuffle answers more reliably using useMemo
  const shuffledAnswers = useMemo(() => {
    return [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5,
    )
  }, [question])

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>

      {shuffledAnswers.map((answer, index) => (
        <TouchableOpacity
          key={index}
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
      ))}
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
  answerButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    width: '80%',
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
  },
})

export default Question
