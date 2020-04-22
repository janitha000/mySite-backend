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

            axios.get(apiUrl, {
            }).then(async response => {
                let data = response.data;
                let omdbData = {
                    Rate: data.Rated,
                    Awards: data.Awards,
                    IMDB: data.imdbRating,
                    IMDBVotes: data.imdbVotes,
                    IMDBId: data.imdbID,
                    BoxOffice: data.BoxOffice
                }
                return resolve(omdbData);
            }).catch(err => {
                console.error(err);
                return reject(err);
            })


        })
    }
}

