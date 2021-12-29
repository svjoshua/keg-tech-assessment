import './styles/style.css'
import './styles/bootstrap.min.css'
import { getGoatFacts } from './getGoatFacts'
import { addGoatFacts } from './addGoatFacts'
import { filterGoatFacts } from './filterGoatFacts'

/**
 * onGetGoatFacts - Action to update the goat facts displayed on the Dom
 */
const onGetGoatFacts = async () => {
  const facts = await getGoatFacts()

  const filteredFacts = filterGoatFacts(facts)

  addGoatFacts(filteredFacts)
}

;(async () => {
  // Select get-goat-facts button Element and attach
  // a click event to it to call onGetGoatFacts
  document
    .querySelector('#get-goat-facts')
    .addEventListener('click', async () => {
      await onGetGoatFacts()
    })
})()
