const amqp = require('amqplib/callback_api');

module.exports = (callback) => {
    amqp.connect('amqp://54.145.44.225', (err, connection) => {
        if(err){
            throw new Error(err);
        }

        callback(connection);
    })
}

