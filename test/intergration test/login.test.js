const request = require('supertest') //returns a function called request, we can send a request to an endpoint
const {User, validate}=require('../../models/register')
let server;
describe('/login', () => {
    beforeEach(() => {
        server = require('../../index')
    })
    afterEach(() => {
        server.close()
    })

    // protect
    describe('POST /', () => {
        it("should return 404 if user credetials are not valid", async () => {
           const res= await request(server)
           .post('/login')
           .send({
            username:"", password:""
        }) //returns a promise
        //    expect(res.status).toBe(200)
           expect(res.status).toBe(401)
        })
    })
})