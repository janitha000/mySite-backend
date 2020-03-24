const rabbitMQConnection = require('./rabbitConnection')

let rabbitMQChannel = null;

rabbitMQConnection((connection) => {
    connection.createChannel((err, channel) => {
        if(err){
            throw new Error(err);
        }

        const queue = 'main queue'
        channel.assertQueue(queue, {
            durable: false
        });

        rabbitMQChannel = channel
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    })
})

export const publishToQueue = async(queueName, data) => {
    rabbitMQConnection.sendToQueue(queueName, new Buffer(data));
}

process.on('exit', (code) => {
    rabbitMQChannel.close();
    console.log('Closing rabbitMQ channel');
})