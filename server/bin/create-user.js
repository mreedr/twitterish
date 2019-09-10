const mongoose = require('mongoose')
const user = require('../src/models/User')

async function start() {
    await mongoose.connect(
        `mongodb://localhost/storj-${process.env.NODE_ENV}`,
        { useNewUrlParser: true, useCreateIndex: true }
    )

    await user.create('PhilHoyt',
        'password',
        'phil.png',
        'Workshop',
        'philhoyt.com',
        'People love chopping wood. In this activity one immediately sees results.')
    await user.create('Julia Pearl',
        'password',
        'julia.png',
        'Music Concert',
        'pppp.com',
        'I like the sand between my toes')
    await user.create('Roy Story',
        'password',
        'story.png',
        '5th St. Library',
        'fortress-close.com',
        'Time Enough At Last')
    process.exit()
}
start()