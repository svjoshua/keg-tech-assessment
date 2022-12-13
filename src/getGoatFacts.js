

/**
 * getGoatFacts - Gets a list of goat facts from the backend API
 */
export const getGoatFacts = async () => {

  // API call using fetch
  let response = await fetch("http://localhost:5005/goats")
  let data = await response.json()

  return data



}
