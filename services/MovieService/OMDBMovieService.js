const constants = require('../../utli/apiRoutes');
const dynmoDbService = require('../../storage/dynmoDbService');
const axios = require('axios');

let apiKey;
let url;

module.exports = class OMDBMovieService {
    constructor() {
        apiKey = process.env.OMDB_API_KEY;
        url = constants.OMDBRoutes.HOME
    }

    getMovieByName = async (movieId, movieName) => {
        let apiUrl = `${url}?t=${movieName}&apikey=${apiKey}`;
        return new Promise(async (resolve, reject) => {
            let dbValue = await dynmoDbService.getItemById(movieId)
            if (dbValue && dbValue != "{}" && dbValue.Item != undefined) {
                if (dbValue.Item.omdbData) {
                    return resolve(dbValue.Item.omdbData);
                }
                else {
                    axios.get(apiUrl, {
                    }).then(async response => {
                        let data = response.data;
                        let omdbData = {
                            Rate: data.Rated,
                            Awards: data.Awards,
                            IMDB: data.imdbRating,
                            IMDBVotes : data.imdbVotes,
                            IMDBId : data.imdbID,
                            BoxOffice : data.BoxOffice
                        }
                        await dynmoDbService.addOMDBData(movieId, omdbData);
                        return resolve(omdbData);
                    }).catch(err => {
                        console.error(err);
                        return reject(err);
                    })
                }

            }


        })
    }
}

