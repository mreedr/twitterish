const user = require('../models/User')
const chrrp = require('../models/Chrrp')

module.exports = [{
    description: 'Adds a new chrrp',
    method: 'post',
    path: '/chrrps',
    auth: false,
    handler: async (req, res) => {
        if (!req.body || !req.body.username || !req.body.body) {
            return res.status(400).json('username or body was not provided')
        }

        const userId = await user.retrieveUserIdByUsername(req.body.username)

        if (!userId) {
            return res.status(404).json('user not found')
        }

        try {
            const newChrrp = await chrrp.create(userId, req.body.body)
            res.status(200).json(newChrrp)
        } catch (error) {
            res.status(400).json(`Failed to add new chrrp for user ${req.body.username}`)
        }
    }
}, {
    description: 'Gets all chrrps for a username',
    method: 'get',
    path: '/:username/chrrps',
    auth: false,
    handler: async (req, res) => {
        try {
            const userId = await user.retrieveUserIdByUsername(req.params.username)
            const chrrps = await chrrp.retrieveAllByOwnerId(userId)
            res.status(200).json(chrrps)
        } catch (error) {
            res.status(400).json(`Failed to get chrrps for user ${req.params.username}`)
        }
    }
}, {
    description: 'Get a chrrp by id',
    method: 'get',
    path: '/chrrps/:id',
    auth: false,
    handler: async (req, res) => {
        try {
            const c = await chrrp.retrieveById(req.params.id)
            res.status(200).json(c)
        } catch (error) {
            res.status(400).json(`Failed to get chrrp ${req.params.id}`)
        }
    }
}, {
    description: 'Updates a chrrp',
    method: 'put',
    path: '/chrrps/:id',
    auth: false,
    handler: async (req, res) => {
        try {
            const undeletedChrrp = await chrrp.update(req.params.id, req.body)
            res.status(200).json(undeletedChrrp)
        } catch (error) {
            console.log(error)
            res.status(400).json(`Failed to delete chrrp ${req.params.id}`)
        }
    }
}, {
    description: 'Deletes a chrrp',
    method: 'delete',
    path: '/chrrps/:id',
    auth: false,
    handler: async (req, res) => {
        try {
            const deletedChrrp = await chrrp.delete(req.params.id)
            res.status(200).json(deletedChrrp)
        } catch (error) {
            res.status(400).json(`Failed to delete chrrp ${req.params.id}`)
        }
    }
}, {
    description: 'Get all Chrrp users',
    method: 'get',
    path: '/users',
    auth: false,
    handler: async (req, res) => {
        try {
            const users = await user.getAll()
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json('Failed to get users')
        }
    }
}, {
    description: 'Get a Chrrp user',
    method: 'get',
    path: '/users/:username',
    auth: false,
    handler: async (req, res) => {
        const userInfo = await user.retrieveUserByUsername(req.params.username)
        if (userInfo) return res.status(200).json(userInfo)
        res.status(400).json(`Failed to get user ${req.params.username}`)
    }
}]