const analyticsService = require('../services/analyticsService')

exports.getSentiment = (req, res, next) => {
    console.log("Called sentiment api")
    let {text } = req.body;
    analyticsService.getSentiments(text).then(result => {
        res.status(200).send(result);
    
    }).catch(err => {
        res.status(500).send(err);
    })

}