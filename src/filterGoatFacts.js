/**
 * filterGoatFacts - Filters goat facts based on word and index
 *
 * TODO: Implement case of text surrounded by HTML entites
 */
export const filterGoatFacts = facts => {
  const cleanUpSpecialCharsRegex = /(^[',.:;?!()]+|[',.:;?!()]+$)/g
  const singleWord = document.querySelector('#single-word-filter').value.trim()
  const wordIndex = parseInt(
    document.querySelector('#word-index-filter').value.trim(),
    10
  )

  if (validateFilters(singleWord, wordIndex)) {
    return facts.filter(fact => {
      // Split sentence and clean up words that starts
      // or ends with some punctuations/special chars
      const factItems = fact
        .toLowerCase()
        .split(/\s+/)
        .map(item => item.replace(cleanUpSpecialCharsRegex, ''))
      return (
        factItems.indexOf(
          singleWord.toLowerCase().replace(cleanUpSpecialCharsRegex, '')
        ) ==
        wordIndex - 1
      )
    })
  }

  return facts
}

/**
 * Method to validate the ptovided filters inputs
 *
 * @param {string} word   to look for in goat facts
 * @param {number} index  of the word in the goat facts
 * @returns boolean whether the provided filters are valid
 *                  + single word with no spaces
 *                  + index is a positive integer
 */
const validateFilters = (word, index) => {
  return /^\S+$/.test(word) && !isNaN(index) && index > 0
}
