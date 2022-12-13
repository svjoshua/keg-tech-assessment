import './styles/style.css'
import './styles/bootstrap.min.css'
import { getGoatFacts } from './getGoatFacts'
import { addGoatFacts } from './addGoatFacts'
import { filterGoatFacts } from './filterGoatFacts'
import { doc } from 'prettier'


// Get the goat facts button from DOM and add event listener for click
const getGoatFactsButton = document.querySelector('#get-goat-facts')
getGoatFactsButton.addEventListener('click', () => {
  onGetGoatFacts()
})

// Get the clear form button from DOM and add event listener for click
const clearFormButton = document.querySelector('#clear-form')
clearFormButton.addEventListener('click', () => {
  document.querySelector('#search-text').value = ""
  document.querySelector('#position').value = ""
  filterGoatFacts()
})

// Get the search text input from DOM and add event listener for change
const searchTextInput = document.querySelector('#search-text')
searchTextInput.addEventListener('input', () => {
  filterGoatFacts()
})

// Get the position input from DOM and add event listener for change
const positionInput = document.querySelector('#position')
positionInput.addEventListener('input', () => {
  filterGoatFacts()
})

/**
 * onGetGoatFacts - Action to update the goat facts displayed on the Dom
 */
const onGetGoatFacts = async () => {

  const facts = await getGoatFacts()
  addGoatFacts(facts)
  filterGoatFacts() //neded to move this after addGoatFacts to work with the search logic

}


