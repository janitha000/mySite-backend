const constants = require('../../utli/apiRoutes');
const axios = require('axios');
const dynmoDbService = require('../../storage/dynmoDbService');

let token = '';


module.exports = class TMDBMovieService {
    constructor() {
        if (token == '') {
            let apiKey = process.env.TMDB_API_KEY;
            let loginRoute = constants.TMDBRoutes.LOGIN;
            axios.post(loginRoute, { "apikey": apiKey }).then(response => {
                token = response.data.token;
            }).catch(err => {
                console.error('Error when getting accesstoken: ' + err)
            })
        }
    }

    getMovieById = (movieId) => {
        let route = `${constants.TMDBRoutes.MOVIE_BY_ID}/${movieId}`
        return new Promise(async (resolve, reject) => {
            try {
                axios.get(route, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        "Accept-Language": 'eng'
                    }
                }).then(response => {
                    //dynmoDbService.addItem(response.data.data);
                    return resolve(response.data.data);
                }).catch(err => {
                    console.error(err);
                    return reject(err);
                })

            }
            catch (err) {
                console.error(err);
            }


        })
    }

    getMovieUpdates = (since) => {
        let route = `${constants.TMDBRoutes.MOVIE_UPDATES}${since}`
        return new Promise((resolve, reject) => {
            axios.get(route, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(response => {
                return resolve(response.data);
            }).catch(err => {
                console.error(err);
                return reject(err);
            })
        })
    }

    getMoviePoster = (url) => {
        let route = `${constants.TMDBRoutes.HOME}${url}`
        console.log(route)
        return new Promise((resolve, reject) => {
            axios.get(route, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(response => {
                return resolve(response.data);
            }).catch(err => {
                //console.error(err);
                return reject(err);
            })
        })
    }
}
