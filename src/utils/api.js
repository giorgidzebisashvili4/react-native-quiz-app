import axios from 'axios'

const BASE_URL = 'https://opentdb.com'

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api_category.php`)
    return response.data.trivia_categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export const fetchQuestions = async (amount, category, difficulty) => {
  try {
    const url = `${BASE_URL}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    const response = await axios.get(url)

    if (response.data.response_code !== 0) {
      throw new Error('No questions available for this selection.')
    }

    return response.data.results
  } catch (error) {
    console.error('Error fetching questions:', error)
    return []
  }
}
