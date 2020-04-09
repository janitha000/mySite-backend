const amqp = require('amqplib/callback_api');
const {rabbit } = require('../configs/env')

module.exports = (callback) => {
    let rabbitUrl = rabbit.url
    amqp.connect(rabbitUrl, (err, connection) => {
        if(err){
            throw new Error(err);
        }

        callback(connection);
    })
}

