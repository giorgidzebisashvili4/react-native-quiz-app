import axios from 'axios'

const BASE_URL = 'https://opentdb.com'

const apiRequest = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error)
    return null
  }
}

export const fetchCategories = async () => {
  const data = await apiRequest(`${BASE_URL}/api_category.php`)
  return data ? data.trivia_categories : []
}

export const fetchQuestions = async (amount, category, difficulty) => {
  const data = await apiRequest(
    `${BASE_URL}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`,
  )
  return data?.response_code === 0 ? data.results : []
}
