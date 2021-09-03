// const factList = require('./goatFacts.json')
const { doIt } = require('@keg-hub/jsutils')
const { api: config } = require('../../configs/server.config')

// I've moved the functions in this file to a class to simplify both the
// integration with the db (without using an ORM, which would be overkill here)
// while also enabling some very simple unit testing.

class GoatService {

  // Since the full set of facts is relatively small, I'm loading them all from
  // the db just once and maintaining a hard copy here. This isn't necessarily
  // a pattern that would apply in tons of scenarios, but it allows me to
  // demonstrate integrating with a database and some basic unit testing that
  // doesn't rely on integration details or elaborate db mocking.
  #masterFacts = []

  // in addition to the master list of facts, I'm keeping a pool of facts to pop
  // items from on request, then refill from the masterFacts array when empty.
  // This allows the api to consistently return a set of 20 without having any
  // duplicates within a set.
  #factPool = []

  /**
   * Creates a GoatService instance
   * @param {string[]} [facts] array of facts to use for this instance
   */
  constructor (facts = []) {
    // allowing a facts array to be passed to the constructor enables testing
    this.#masterFacts = facts
  }

  /**
   * Integrates instance with a MongoDb database and collection. Builds the
   *  database on first app run by importing data from goatFacts.json.
   * @param {object} db reference to a MongoDB Db class object
   */
  async initDb (db) {
    // database integration code is contained within this function. I'm not
    // unit testing this function since it relies on integration details. The
    // logic here is simple enough that splitting it into multiple methods seems
    // pedantic and not necessary.
    const collection = db.collection(config.dbCollection)

    // perform initial data import if needed
    const count = await collection.count()
    if (count === 0) {
      const importFacts = require('./goatFacts.json')
      for (const fact of importFacts) {
        await collection.insertOne({ fact })
      }
    }

    // populate masterFacts from the db
    const docs = await collection.find({}).toArray()
    this.#masterFacts = docs.map(doc => doc.fact)
  }

  /**
   * Gets a single fact about goats from the GoatService instance
   * @returns {string} a fact about goats
   */
  getRandomFact () {
    // refill the pool if empty
    if (!this.#factPool.length) {
      this.#factPool = [...this.#masterFacts]
    }

    // take a fact out of the array
    return this.#factPool.pop()
  }

  /**
   * Gets an array of 20 goat facts
   * @returns string[]
   */
  async goatFacts () {
    return doIt(20, global, () => this.getRandomFact())
  }
}


// let collection

// const initGoats = async (db) => {
//   if (
//     !db ||
//     typeof db.collection !== 'function'
//   ) {
//     throw new Error('initGoats should be called with a mongodb Db instance')
//   }

//   collection = db.collection(config.dbCollection)

//   // perform initial data import if needed
//   const count = await collection.count()
//   if (count === 0) {
//     const importFacts = require('./libs/goatFacts.json')
//     for (const fact of importFacts) {
//       await collection.insertOne({ fact })
//     }
//   }

//   return true
// }
// let factPool = []

// const reloadPool = async () => {
//   if (!collection) {
//     throw new Error('initGoats must be called before accessing goat facts!')
//   }
//   const docs = await collection.find({}).toArray()
//   factPool = docs.map(doc => doc.fact)
// }

// const getRandomFact = async () => {
//   if (!factPool.length) { // check if the pool is empty
//     await reloadPool()
//   }
//   return factPool.pop() // grab an item off the end of the pool
// }

// const goatFacts = async () => {
//   let count = 20
//   const facts = []
//   while (count--) {
//     facts.push(await getRandomFact())
//   }
//   return facts
// }

module.exports = {
  GoatService,
  // initGoats,
  // goatFacts: goatFacts,
  // _getRandomFact: getRandomFact // exposed for testing
}
