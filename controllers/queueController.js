const rabbitMQService = require('../rabbitMq/rabbitMQService');

exports.addToQueue = async (req,res,next) => {
    try{
        let {message} = req.body;
        await rabbitMQService.publishToQueue('main-queue', message);
        res.status(200).send('Message published to queue');
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }

}