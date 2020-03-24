const amqp = require('amqplib/callback_api');

module.exports = (callback) => {
    amqp.connect('amqp://54.226.34.240', (err, connection) => {
        if(err){
            throw new Error(err);
        }

        callback(connection);
    })
}

