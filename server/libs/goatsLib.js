const { doIt } = require('@keg-hub/jsutils')
const factList = require('./goatFacts.json')

// grabbing an element from the array via some PRNG is susceptible to returning
// duplicates within the sets of 20. instead, shuffle the array first, and
// maintain a cloned version we can pop elements from, then re-clone when empty.

// Fisher–Yates shuffle
for (let i = factList.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [factList[i], factList[j]] = [factList[j], factList[i]];
}

let factPool = []

const getRandomFact = () => {
  if (!factPool.length) { // check if the pool is empty
    factPool = [...factList] // if so, clone the original (shuffled) array
  }
  return factPool.pop() // grab an item off the end of the pool
}

// the downside to doing this is that occasionally users could notice the pattern
// repeats. but it seems more likely for a user to notice the same fact appearing
// twice (or more) in the list, so it seems like an ok tradeoff.

const goatFacts = async () => {
  // our shuffled array method works if multiple users are hitting the server
  // bc `doIt` is sync, so each request will get the next 20 items in the array
  return doIt(20, global, () => getRandomFact())
}

module.exports = {
  goatFacts,
}
