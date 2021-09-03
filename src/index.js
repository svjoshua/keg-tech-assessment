import './styles/style.css'
import './styles/bootstrap.min.css'
import { getGoatFacts } from './getGoatFacts'
import { addGoatFacts } from './addGoatFacts'
import { filterGoatFacts } from './filterGoatFacts'

const wordInput = document.querySelector('#goat-facts-filter-text')
const wordIndexInput = document.querySelector('#goat-facts-filter-index')

wordInput.addEventListener('keypress', e => {
  // get goat facts on enter key
  if (e.key === 'Enter') onGetGoatFacts()

  // limit input to a single word (no spaces)
  if (e.key === ' ') {
    e.preventDefault()
  }
})

wordInput.addEventListener('change', function (e) {
  // sanitize input on change event (handles copy/paste)
  this.value = this.value.replaceAll(/\s/g, '')
})

wordIndexInput.addEventListener('keypress', e => {
  // get goat facts on enter key
  if (e.key === 'Enter') onGetGoatFacts()

  // limit input index to digits
  if (!/\d/.test(e.key)) {
    e.preventDefault()
  }
})

// clear input if non-integer value is entered (e.g. on paste)
wordIndexInput.addEventListener('change', function () {
  if (!/^\d+$/g.test(this.value)) {
    this.value = ''
  }
})

const alert = document.querySelector('#goat-alert')

/**
 * onGetGoatFacts - Action to update the goat facts displayed on the Dom
 */
const onGetGoatFacts = async () => {
  const filterWord = wordInput.value
  const filterIndexString = wordIndexInput.value
  const filterIndex = parseInt(filterIndexString)

  // retrieve 20 (unfiltered) facts
  let facts = await getGoatFacts()

  // if both a word and an integer are entered, filter the results
  if (
    filterWord.length &&
    filterIndexString.length &&
    Number.isInteger(Number(filterIndex))
  ) {
    facts = filterGoatFacts(facts, filterWord, filterIndex)
  }

  // add the facts to the DOM
  addGoatFacts(facts)

  if (facts.length) {
    // make sure the empty alert message is hidden
    alert.setAttribute('hidden', '')
  }
  else {
    // show the empty alert message
    alert.removeAttribute('hidden')
  }
}

const getGoatFactsButton = document.querySelector('#get-goat-facts')
getGoatFactsButton.addEventListener('click', onGetGoatFacts)
