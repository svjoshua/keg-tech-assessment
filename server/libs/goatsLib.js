const { doIt } = require('@keg-hub/jsutils')
const { getGoatFactsFromDb } = require('../db/mongodb')

const getRandomFact = factList => {
  // return a randomly selected item of the goat facts array
  return factList[Math.floor(Math.random() * factList.length)]
}

const goatFacts = () => {
  // Retrieve all goat facts then get 20 randoms
  return getGoatFactsFromDb().then(data =>
    doIt(20, global, () => getRandomFact(data)).map(facts => facts.fact)
  )
}

module.exports = {
  goatFacts,
}
