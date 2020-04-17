const redisService = require('./redisService');

let ioClient;

module.exports =  {
    start : (io) => {
        ioClient = io;
        io.on('connection', (socket) => {
            //console.log(`user with ${socket.handshake.query.userId} connected`);
            console.log('User Connected')
            
            redisService.setData(socket.handshake.query.userId, socket.id);
            socket.emit('ConnectionEvent', `React user with user id ${socket.handshake.query.userId} connected`)
            socket.broadcast.emit('ConnectionEvent', `React user with user id ${socket.handshake.query.userId} connected`)


            io.to()
            
            // socket.socket(socketIdArr[0]).emit('ConnectonEvent', 'React user 0 connected')

            //io.sockets.connected[socketIdArr[0]].emit('ConnectonEvent', `React user ${socketIdArr[0]} connected`)
        
            socket.on('disconnect', () => {
                console.log(`user with ${socket.id} disconnected`)
                redisService.removeData(socket.handshake.query.userId)
            })
        })
    },

    sendDataSingle : (key, event, value) =>{
        let socketId = redisService.getData(key);
        if(socketId != null | socketId != undefined){
            console.log(`Sending data to event: ${event} to socket id: ${key} value: ${value}`)
            //ioClient.sockets.socket(socketId).emit(event, value);
            ioClient.to(socketId).emit(event, value);
        }
    }


}