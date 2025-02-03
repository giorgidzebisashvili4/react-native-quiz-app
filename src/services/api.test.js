// src/services/api.test.js
import axios from 'axios'
import { fetchCategories, fetchQuestions } from './api'

jest.mock('axios', () => ({
  get: jest.fn(),
}))

describe('api.js', () => {
  let consoleErrorSpy // Declare a spy variable

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}) // Spy and mock
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore() // Restore the original console.error
  })

  describe('fetchCategories', () => {
    it('fetches categories successfully', async () => {
      const mockCategories = [{ id: 9, name: 'General Knowledge' }]
      axios.get.mockResolvedValue({
        data: { trivia_categories: mockCategories },
      })

      const categories = await fetchCategories()
      expect(categories).toEqual(mockCategories)
      expect(axios.get).toHaveBeenCalledWith(
        'https://opentdb.com/api_category.php',
      )
      expect(consoleErrorSpy).not.toHaveBeenCalled() // Check that console.error wasn't called
    })

    it('handles errors when fetching categories', async () => {
      axios.get.mockRejectedValue(new Error('Network Error'))

      const categories = await fetchCategories()
      expect(categories).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalled() // Check that console.error was called
    })

    it('handles null data', async () => {
      axios.get.mockResolvedValue(null)

      const categories = await fetchCategories()
      expect(categories).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalled() // Check that console.error was called
    })
  })

  describe('fetchQuestions', () => {
    it('fetches questions successfully', async () => {
      const mockQuestions = [{ question: 'What is the capital of France?' }]
      axios.get.mockResolvedValue({
        data: { response_code: 0, results: mockQuestions },
      })

      const questions = await fetchQuestions(10, 9, 'easy')
      expect(questions).toEqual(mockQuestions)
      expect(axios.get).toHaveBeenCalledWith(
        'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple',
      )
      expect(consoleErrorSpy).not.toHaveBeenCalled() // Check that console.error wasn't called
    })

    it('handles errors when fetching questions', async () => {
      axios.get.mockRejectedValue(new Error('Network Error'))

      const questions = await fetchQuestions(10, 9, 'easy')
      expect(questions).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalled() // Check that console.error was called
    })

    it('handles API error code', async () => {
      axios.get.mockResolvedValue({ data: { response_code: 1 } })
      const questions = await fetchQuestions(10, 9, 'easy')
      expect(questions).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalled() // Check that console.error was called
    })

    it('handles null data', async () => {
      axios.get.mockResolvedValue(null)

      const questions = await fetchQuestions(10, 9, 'easy')
      expect(questions).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalled() // Check that console.error was called
    })
  })
})
