const { doIt } = require('@keg-hub/jsutils')
const factList = require('./goatFacts.json')
const factListLength = factList.length

const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
}

function getRandomFact(factArray) {

  let randomIndex

  do {
    randomIndex = getRandomIndex(factList.length)
  } while(factArray.includes(factList[randomIndex]))

  factArray.push(factList[randomIndex])

  return factArray

}

const goatFacts = async () => {

  const factArray = []
  doIt(20, global, () => getRandomFact(factArray))

  return factArray
}

module.exports = {
  goatFacts,
  getRandomIndex,
  getRandomFact,
}
