import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Question = ({ question, selectedAnswer, onAnswerPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>

      {question.incorrect_answers
        .concat(question.correct_answer)
        .sort(() => Math.random() - 0.5)
        .map((answer, index) => (
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
    //flex: 1,  No need to flex here, parent will handle it
    //justifyContent: 'center',
    //alignItems: 'center',
    width: '100%', // Question takes up full width
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
  },
})

export default Question
