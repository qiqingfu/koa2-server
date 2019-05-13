const redis = require('redis')
const assert = require('assert')
const { REDIS_CONFIG } = require('../config/db')

const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

client.on('error', err => {
    assert(err instanceof Error);
    assert(err instanceof redis.AbortError)
    assert(err instanceof redis.AggregateError)
})

client.on('ready', () => {
    console.log('redis client success.')
})

module.exports = client
