const AWS = require('aws-sdk')
const {sendDataSingle} = require('../services/socketIOService')
const {getData} = require('../services/redisService')

exports.getSentiments = (text) => {
    return new Promise((resolve, reject) => {
        console.log(process.cwd())
        AWS.config.loadFromPath('configs/AWSConfig.json')

        let comprehend = new AWS.Comprehend({ apiVersion: '2017-11-27' });
        let params = {
            LanguageCode: 'en',
            Text: text
        };

        comprehend.detectSentiment(params, (err, res) => {
            if (err) {
                console.error(err);
                return reject(err);
            }

            resolve(res);
        })
    })
}

exports.getKeyPharases = (text) => {
    return new Promise((resolve, reject) => {
        console.log(process.cwd())
        AWS.config.loadFromPath('configs/AWSConfig.json')

        let comprehend = new AWS.Comprehend({ apiVersion: '2017-11-27' });
        let params = {
            LanguageCode: 'en',
            Text: text
        };

        comprehend.detectKeyPhrases(params, (err, res) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(res);
        })
    })
}

exports.getCalculation = (inputOneS, inputTwoS, operation, tokenHeader) => {
    let token = tokenHeader.split('Bearer ')[1]
    let inputOne = parseFloat(inputOneS)
    let inputTwo = parseFloat(inputTwoS)
    let result = 0;
    switch (operation) {
        case 'ADD':
            result = inputOne + inputTwo
            break;
        case 'SUB':
            result = inputOne - inputTwo
            break;
        case 'MUL':
            result = inputOne * inputTwo
            break;
        case 'DIV':
            result = inputOne / inputTwo
            break;
    }
    getData(token).then((socketId) => {
        sendDataSingle(socketId, 'CALCULATION', result);
        console.log('Result Sent')
    })
   
}