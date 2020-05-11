const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const logger = require('./utli/logger')

const http = require('http');
const socketIO = require('socket.io')
require("dotenv").config();


const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const server = http.createServer(app);
let port = process.env.port;
if (!port)
    port = 3001


const io = socketIO(server);

const repoRouter = require('./routes/repositoryRoutes');
const authRouter = require('./routes/authRoutes');
const queueRouter = require('./routes/queueRoutes');
const analyticsRouter = require('./routes/analyticsRoutes');
const movieRouter = require('./routes/movieRoutes');

//const socketIOService = require('./services/socketIOService');
//socketIOService.start(io);
const redisService = require('./services/redisService')
redisService.startConnection();




app.get('/', (req, res) => res.send({ status: "to my site from docker" }));

app.use('/repositories', repoRouter)
app.use('/auth', authRouter)
app.use('/queue', queueRouter)
app.use('/analytics', analyticsRouter)
app.use('/movies', movieRouter)


server.listen(port, () => {
    console.log(`Application is running and listening on port ${port}`)
    logger.info(`Application is running and listening on port ${port}`)
})