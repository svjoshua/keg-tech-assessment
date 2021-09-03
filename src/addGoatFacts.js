const goatFactsList = document.querySelector('#goat-facts-list')

/**
 * addGoatFacts - Adds the passed in goat facts to the Dom
 */
export const addGoatFacts = (facts = []) => {
  // Clear out any past goat facts under the ul#goat-facts-list element
  goatFactsList.innerHTML = ''

  for (const fact of facts) {
    goatFactsList.insertAdjacentHTML('beforeend', `<li>${fact}</li>`)
  }
}
