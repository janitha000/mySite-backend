const redisService = require('./redisService');

let io;

module.exports =  {
    start : (io) => {
        io = io;
        io.on('connection', (socket) => {
            console.log(`user with ${socket.handshake.query.userId} connected`);
            
            redisService.setData(socket.handshake.query.userId, socket.id);
            socket.emit('ConnectonEvent', `React user with user id ${socket.handshake.query.userId} connected`)
            socket.broadcast.emit('ConnectonEvent', `React user with user id ${socket.handshake.query.userId} connected`)


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
            io.to(socketId).emit(event, value);
        }
    }


}