
module.exports =  {
    start : (io) => {
        io.on('connection', (socket) => {
            console.log('user connected');
            socket.emit('ConnectonEvent', 'React user connected')
        
            socket.on('disconnect', () => {
                console.log('User disconnected')
            })
        })
    }

}