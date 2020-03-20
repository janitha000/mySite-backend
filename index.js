const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io')

const rabbitMQHandler = require('./rabbitMq/rabbitConnection')

const app = express();
const server = http.createServer(app);
const port = 3001;

const io = socketIO(server);

const repoRouter = require('./routes/repositoryRoutes');

rabbitMQHandler((connection) => {
    connection.createChannel((err, channel) => {
        if(err){
            throw new Error(err);
        }

        const queue = 'main queue'
        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    })
})


io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('ConnectonEvent', 'React user connected')

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

app.get('/', (req, res) => res.send({status: "Welcome to my site github integration"}));

app.use(bodyParser.urlencoded({extend : true}))
app.use('/repositories', repoRouter)

server.listen(port, () => {
    console.log('Application is running and listening on port 3001')
})