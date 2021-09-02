const webUrl = new URL(location)
const apiUrl = `${webUrl.protocol}//${webUrl.hostname}:5005`
/**
 * getGoatFacts - Gets a list of goat facts from the backend API
 */
export const getGoatFacts = async () => {
  const res = await fetch(`${apiUrl}/goats`)
  const json = await res.json()
  return json.data
}
