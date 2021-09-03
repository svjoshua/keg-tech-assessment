#!/usr/bin/env node

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const apiEndpoints = require('./endpoints')
const { api: config } = require('../configs/server.config')
const { noOpObj, noPropArr, eitherArr } = require('@keg-hub/jsutils')

const rootPath = path.join(path.normalize(__dirname), '..')

/**
 * Configures cors for the backend API
 * Defines the origins that are allow to connect to the API
 * @param {Object} app - Express app object
 * @param {Object} config - server config object
 *
 * @returns {void}
 */
const setupCors = (app, config = noOpObj) => {
  if (!app) return

  const origins = config.origins || noPropArr
  const allowedOrigins = eitherArr(origins, [origins])

  app.use((req, res, next) => {
    const origin = req.headers.origin
    const foundOrigin = allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0]

    res.header('Access-Control-Allow-Origin', foundOrigin)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )

    next()
  })
}

/**
 * Configures the API and sets static paths based on the config object
 * @param {Object} app - Express app object
 * @param {Object} config - server config object
 *
 * @returns {void}
 */
const setupServer = (app, config) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(rootPath))
}

const setupDb = async (app, config) => {
  const client = new MongoClient(config.dbUrl)
  await client.connect() // initialize connetion to mongodb
  const db = client.db('goats')
  app.set('db', db) // store db as an app setting for access within libs
}

/**
 * Starts a express API server
 * Loads the server config for configuring the server properties
 *
 * @returns {Object} - Express app and server
 */
const initApi = async () => {
  const app = express()

  await setupDb(app, config)
  setupServer(app, config)
  setupCors(app, config)
  await apiEndpoints(app, config)

  const server = app.listen(config.port, config.host, () =>
    console.log(new Date() + ` - Listening on ${config.host}:${config.port}`)
  )

  return { app, server }
}

module.exports = {
  initApi,
}
