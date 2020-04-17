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

exports.getCalculation = (req, res, next) => {
    console.log('Calculation api called');
    try{
        let token = req.headers.authorization
        let {inputOne, inputTwo, operation} = req.body;
        let result = analyticsService.getCalculation(inputOne, inputTwo, operation, token);
        res.status(200).send({"result" : result});
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
    
}