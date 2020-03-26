const redis = require('redis')
let client;


exports.startConnection = () => {
    client = redis.createClient();
    

    client.on('connect', () => {
        console.log('Redis client is connected');
    })
    
    client.on('error' , (err) => {
        console.error(err);
    })
}


exports.setData = (key, value) => {
    client.set(key, value);
}

exports.getData = (key) => {
    client.get(key, (err, result) => {
        if(err){
            console.error(err);
            return null;
        }

        return result;
    })
}

exports.removeData = (key) => {
    client.del(key);
}