/**
 * This module allow us to re-use a unique connection
 * to the database throughout the application
 */
const { MongoClient } = require('mongodb')
const { mongodb: dbConfig } = require('../../configs/mongodb.config')
const client = new MongoClient(dbConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 1000,
  serverSelectionTimeoutMS: 1000,
})

let dbConnection

const connectToServer = async callback => {
  await client.connect(function (err, db) {
    if (err || !db) {
      return callback(err)
    }

    dbConnection = db.db(dbConfig.db_name)
    console.log('Successfully connected to MongoDB.')

    return callback()
  })
}

const getDb = () => {
  return dbConnection
}

const getGoatFactsFromDb = () => {
  return getDb().collection('goat_facts')
    .find({})
    .toArray()
}

module.exports = {
  connectToServer,
  getDb,
  getGoatFactsFromDb,
}
