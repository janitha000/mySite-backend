const analyticsService = require('../services/analyticsService')

exports.getSentiment = (req, res, next) => {
    console.log("Called sentiment api")
    let {text } = req.body;
    analyticsService.getSentiments(text).then(res => {
        res.status(200).send(res)
    }).catch(err => {
        res.status(500).send(err);
    })

}