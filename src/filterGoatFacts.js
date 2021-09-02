/**
 * filterGoatFacts - Filters goat facts based on word and index
 */
export const filterGoatFacts = (facts, word, index) => {
  return facts.filter(fact => {
    const words = fact.split(/\s+/)
    const wordAtIndex = words[index - 1]

    return (
      // is there even that many words?
      wordAtIndex &&
      // does the word at the index match?
      // (it's not specified, but case insensitive seems preferable here)
      wordAtIndex.toLowerCase() === word.toLowerCase()
    )
  })
}
