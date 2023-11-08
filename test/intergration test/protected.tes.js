const request = require('supertest') //returns a function called request, we can send a request to an endpoint
let server;
describe('/protected', () => {
    beforeEach(() => {
        server = require('../../index')
    })
    afterEach(() => {
        server.close()
    })

    // protect
    describe('GET /', () => {
        it("should return protected page", async () => {
           const res= await request(server).get('/protected') //returns a promise
           expect(res.status).toBe(401)
        })
    })
})