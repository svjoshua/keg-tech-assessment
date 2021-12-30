const fs = require('fs')
const path = require('path')
const {api: config} = require('../configs/server.config')
const {promisify} = require('util')
const {exec} = require('child_process')
const {isStr, deepFreeze, deepMerge, noOpObj} = require('@keg-hub/jsutils')
const cmdExec = promisify(exec)
const axios = require('axios')

const apiURl = `http://${config.host}:${config.port}`
const buildRequest = request => {
  request = (isStr(request) && {url: request}) || request
  request.url = request.url.includes('http:') ? request.url : `${config.baseUrl}/${request.url}`

  return deepMerge(
    {
      method: 'GET',
      url: config.baseUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    },
    request
  )
}

const networkRequest = async request => {
  try {
    const builtRequest = buildRequest(request)
    const {data} = await axios(builtRequest)

    return deepMerge(
      {
        success: false,
        statusCode: null,
        data: null,
        errorMessage: null,
      },
      data
    )
  } catch ({response, message, stack}) {
    return {
      success: false,
      data: response ? response.data : null,
      statusCode: response ? response.status : null,
      errorMessage: message,
    }
  }
}

;(async () => {
  const {data} = await networkRequest('')

  if (data.inDocker) return console.log(`\n[ SUCCESS ] - Server API docker check passed!\n`)

  throw new Error(`Server API failed docker check!`)
})()
