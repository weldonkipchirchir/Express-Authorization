const request = require('supertest') //returns a function called request, we can send a request to an endpoint
const {User, validate}=require('../../models/register')
let server;
describe('/register', () => {
    beforeEach(() => {
        server = require('../../index')
    })
    afterEach(() => {
        server.close()
    })

    // protect
    describe('POST /', () => {
        it("Register a user", async () => {
            await User.collection.insertOne({
                "username":"espur",
                "password":"rsoer"
              })
           const res= await request(server).post('/register') //returns a promise
        //    expect(res.status).toBe(200)
           expect(res.status).toBe(400)
        //    expect(res.body.length).toBe(1)
        })
    })
})