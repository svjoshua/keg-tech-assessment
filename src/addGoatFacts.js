/**
 * addGoatFacts - Adds the passed in goat facts to the Dom
 */
export const addGoatFacts = (facts = []) => {
  const goatFactsList = document.querySelector('ul#goat-facts-list')

  // Clear all <li> elements under ul#goat-facts-list
  goatFactsList.innerHTML = ''

  // Display no-goat-fact-found message
  document.querySelector('#no-goat-fact-found').className =
    facts.length > 0 ? 'd-none' : 'd-block'

  facts.forEach((fact, idx) => {
    const goatFactItem = document.createElement('li')
    goatFactItem.classList.add(
      'list-group-item',
      idx % 2 === 0 ? 'list-group-item-info' : 'list-group-item-light'
    )
    goatFactItem.innerHTML = fact

    goatFactsList.appendChild(goatFactItem)
  })
}
