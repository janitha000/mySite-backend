const aws = require('aws-sdk')

exports.getSentiments = (text) => {
    return new Promise((resolve, reject) => {
        let comprehend = new aws.Comprehend({apiVersion: '2017-11-27'});

        let params = {
            LanguageCode: 'en', 
            Text: text
        };

        comprehend.detectSentiment(params, (err, res) => {
            if(err){
                console.error(err);
                return reject(err);
            }

            resolve(res);
        })
    })
}