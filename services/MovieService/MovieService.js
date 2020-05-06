const TMDBMovieService = require('./TMDBMovieService');
const OMDBMovieService = require('./OMDBMovieService');
const dynmoDbService = require('../../storage/dynmoDbService');
const storageService = require('../../storage/StorageService')

let tmdbMovieService = new TMDBMovieService();
let oMDBMovieService = new OMDBMovieService();


exports.getMovie = (movieId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let dbValue = await dynmoDbService.getItemById(movieId);
            let dbValue = await storageService.DynmodbGetItemById(movieId);
            if (dbValue && dbValue != "{}" && dbValue.Item != undefined) {
                let dbItem = dbValue.Item;
                if (dbItem.omdbData) {
                    let result = {
                        data: dbItem
                    };
                    return resolve(result);
                } else {
                    let omdbData = await oMDBMovieService.getMovieByName(movieId, dbItem.name);
                    dynmoDbService.addOMDBData(movieId, omdbData);
                    dbItem.omdbData = omdbData;
                    let result = {
                        data: dbItem
                    };
                    return resolve(result);
                }
            }
            else {
                let data = await tmdbMovieService.getMovieById(movieId);
                let englishTranslation = getEnglishTranslation(data.translations);
                let omdbData = await oMDBMovieService.getMovieByName(movieId, englishTranslation.name);
                data.omdbData = omdbData;
                dynmoDbService.addItem(data);
                let result = {
                    data: data
                };
                return resolve(result);
            }
        }
        catch (err) {
            return reject(err);
        }
    })
}

exports.getMovieList = () => {
    return new Promise((resolve, reject) => {
        dynmoDbService.getItems().then(items => {
            resolve(items)
        }).catch(err => {
            reject(err);
        })
    })
}

const getEnglishTranslation = (translations) => {
    let englishTranslation;
    for (let i = 0; i < translations.length; i++) {
        if (translations[i].language_code == "eng") {
            englishTranslation = translations[i]
            break;
        }
    }

    return englishTranslation;
}