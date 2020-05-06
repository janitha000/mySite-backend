const redis = require('redis')
const logger = require('../utli/logger')
let client;


exports.startConnection = () => {
    var port = process.env.REDIS_PORT || 6379;
    var host = process.env.REDIS_HOST || '127.0.0.1';
    client = redis.createClient(port, host);

    client.on('connect', () => {
        console.log('Redis client is connected');
    })

    client.on('error', (err) => {
        console.error(err);
    })
}


exports.setData = (key, value) => {
    return new Promise((resolve, reject) => {
        client.set(key, value);
        client.expire(key, 60*15);
        logger.info('Item saved to redis')
        resolve(true);
    }).catch(err => {
        logger.error('Error when setting on redis'.err);
        reject(err);
    })
}

exports.getData = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, result) => {
            if (err) {
                console.error(err);
                return reject(err)
            }

            resolve(result);
        })
    })
}

exports.removeData = (key) => {
    client.del(key);
}