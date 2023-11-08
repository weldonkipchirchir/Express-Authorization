const request = require('supertest') //returns a function called request, we can send a request to an endpoint
const {User, validate}=require('../../models/register')
let server;
describe('/users', () => {
    beforeEach(() => {
        server = require('../../index')
    })
    afterEach(async() => {
        server.close()
        // await User.removeListener({})
    })

    // protect
    describe('GET /', () => {
        it("Get registered users", async () => {
            // await User.collection.insertOne({
            //     "username":"espur",
            //     "password":"rsoer"
            //   })
           const res= await request(server).get('/users') //returns a promise
           expect(res.status).toBe(200)
        //    expect(res.body.length).toBe(1)
        //    expect(res.body.some(u=>u.username==='espur' )).toBeTruthy();


        })
    })
    describe('GET /:id', () => {
        it("should return a genre if a valid id is passed", async () => {
            const user = new User({"username":"weldon", "password":"weldon"})
            await user.save();
            const res = await request(server).get('/users/'+user._id)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('username', user.username)
        })

        it("should return 404 if a invalid id is passed", async () => {
            const res = await request(server).get('/users/1')
            expect(res.status).toBe(404)
            // expect(res.body).toHaveProperty('username', user.username)
        })
    })
})