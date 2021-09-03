import './styles/style.css'
import './styles/bootstrap.min.css'
import { getGoatFacts } from './getGoatFacts'
import { addGoatFacts } from './addGoatFacts'
import { filterGoatFacts } from './filterGoatFacts'

const wordInput = document.querySelector('#goat-facts-filter-text')
const wordIndexInput = document.querySelector('#goat-facts-filter-index')

// limit input to a single word (no spaces)
wordInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') onGetGoatFacts()
  if (e.key === ' ') {
    e.preventDefault()
  }
})

// sanitize input on change event (handles copy/paste)
wordInput.addEventListener('change', function (e) {
  this.value = this.value.replaceAll(/\s/g, '')
})

// limit input index to digits
wordIndexInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') onGetGoatFacts()
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

  let facts = await getGoatFacts()

  if (
    filterWord.length &&
    filterIndexString.length &&
    Number.isInteger(Number(filterIndex))
  ) {
    facts = filterGoatFacts(facts, filterWord, filterIndex)
  }

  addGoatFacts(facts)

  if (facts.length) {
    alert.setAttribute('hidden', '')
  }
  else {
    alert.removeAttribute('hidden')
  }
}

const getGoatFactsButton = document.querySelector('#get-goat-facts')
getGoatFactsButton.addEventListener('click', onGetGoatFacts)
