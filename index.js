const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const http = require('http');
const socketIO = require('socket.io')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const server = http.createServer(app);
const port = 3001;

const io = socketIO(server);

const repoRouter = require('./routes/repositoryRoutes');
const authRouter = require('./routes/authRoutes');
const queueRouter = require('./routes/queueRoutes');


io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('ConnectonEvent', 'React user connected')

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

app.get('/', (req, res) => res.send({status: "Welcome to my site github integration"}));

app.use('/repositories', repoRouter)
app.use('/auth', authRouter)
app.use('/queue', queueRouter)

server.listen(port, () => {
    console.log('Application is running and listening on port 3001')
})