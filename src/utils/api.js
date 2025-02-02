const BASE_URL = 'https://opentdb.com'

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api_category.php`)
    const data = await response.json()
    return data.trivia_categories // Returns array of categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export const fetchQuestions = async (amount, category, difficulty) => {
  try {
    const url = `${BASE_URL}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    const response = await fetch(url)
    const data = await response.json()

    if (data.response_code !== 0) {
      throw new Error('No questions available for this selection.')
    }

    return data.results // Returns array of questions
  } catch (error) {
    console.error('Error fetching questions:', error)
    return []
  }
}
