const axios = require('axios')
const { api: apiConfig } = require('../../../configs/server.config')
const { initApi } = require('../../../server/server')

describe("testing-goat-facts-api", () => {

    let appServer
    beforeAll(() => {
        appServer = initApi()
    })

    afterAll(() => {
        appServer.then(apps => {
            apps.server.close()
        })
    })

    // Check that we can receive the expected data from /goats endpoint
    it("GET /goats - success", async () => {
        await axios.get(`${apiConfig.baseUrl}/goats`)
            .then(response => {
                expect(response.data.status).toBe(200)
                expect(response.data.data.length).toBe(20)
            })
    })

     // Check that we redirect to the catchAll endpoint
     it("GET /goatss - catchAll", async () => {
        await axios.get(`${apiConfig.baseUrl}/goatss`)
            .then(response => {
                expect(response.data.status).toBe(200)
                expect(response.data.data).toHaveProperty('uuid')
                expect(response.data.data).toHaveProperty('inDocker')
            })
    })
})
