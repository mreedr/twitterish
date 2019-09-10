const chrrp = require('./Chrrp')
const user = require('./User')
const testBeforeHook = require('../lib/test-before-hook')

describe('Chrrp Model', function () {
    let userId

    beforeEach(testBeforeHook)

    beforeEach(async () => {
        const newUser = await user.create('KidCudi', 'password')
        userId = newUser._id
    })

    it('should create a Chrrp', async () => {
        const body = 'some body'
        const newChrrp = await chrrp.create(userId, body)
        expect(newChrrp).toBeDefined()
        expect(newChrrp.ownerId).toStrictEqual(userId)
        expect(newChrrp.body).toStrictEqual(body)
    })

    it('should retrieve a todo by id', async () => {
        const body = 'some body'
        const newChrrp = await chrrp.create(userId, body)
        const retrievedChrrp = await chrrp.retrieveById(newChrrp._id)
        expect(retrievedChrrp).toBeDefined()
        expect(retrievedChrrp.ownerId).toStrictEqual(userId)
        expect(retrievedChrrp.body).toStrictEqual(body)
    })

    it('should retrieve all Chrrps from given user', async () => {
        const body = 'some body'
        await chrrp.create(userId, body)
        await chrrp.create(userId, body)
        await chrrp.create(userId, body)

        const retrievedChrrps = await chrrp.retrieveAllByOwnerId(userId)
        expect(retrievedChrrps).toBeDefined()
        expect(retrievedChrrps.length).toStrictEqual(3)
    })

    it('should delete a Chrrp', async () => {
        const body = 'some body'
        const newChrrp = await chrrp.create(userId, body)
        const deletedChrrp = await chrrp.update(newChrrp._id, { deleted: true })
        expect(deletedChrrp.deleted).toStrictEqual(true)
    })
})