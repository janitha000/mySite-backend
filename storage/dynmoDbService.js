const AWS = require('aws-sdk')

AWS.config.loadFromPath('configs/AWSConfig.json')
AWS.config.update({ endpoint: "https://dynamodb.us-east-1.amazonaws.com" });
// AWS.config.update({
//     endpoint: "arn:aws:dynamodb:us-east-1:628640267234:table/movie-db",
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//       }
// });

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "movie-db";

exports.addItem = (data) => {
    let Item = {
        "id": data.id,
        "artworks": data.artworks,
        "genres": data.genres,
        "people": data.people,
        "release_dates": data.release_dates,
        "trailers": data.trailers,
        "translations": data.translations
    }
    EmptyRemoved = removeEmptyStringElements(Item)

    var params = {
        TableName: table,
        Item : EmptyRemoved
    };

    

    console.log("Adding a new item...");
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

exports.getItemById = (id) => {
    let params = {
        TableName: table,
        Key:{
            "id": parseInt(id) 
        }
    };

    return new Promise((resolve, reject) => {
        docClient.get(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {
                console.log("GetItem succeeded:");
                return resolve(data)
            }
        });
    })
    
    
}

exports.addMovieKeyPhrases = (movieId, ketPhrases) => {
    var params = {
        TableName:table,
        Key:{
            "id": parseInt(movieId)
        },
        UpdateExpression: "set keyPhrases =:a",
        ExpressionAttributeValues:{
            ":a":ketPhrases
        },
        ReturnValues:"UPDATED_NEW"
    };
    
    console.log("Updating the item...");
    return new Promise((resolve, reject) => {
        docClient.update(params, function(err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err)
            } else {
                console.log("UpdateItem succeeded:");
                resolve(data);
            }
        });
    })  
}

function removeEmptyStringElements(obj) {
    for (var prop in obj) {
        if (typeof obj[prop] === 'object') {// dive deeper in
            removeEmptyStringElements(obj[prop]);
        } else if (obj[prop] === '') {// delete elements that are empty strings
            delete obj[prop];
        }
    }
    return obj;
}

