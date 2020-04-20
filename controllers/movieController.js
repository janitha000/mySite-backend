const TMDBMovieService = require('../services/MovieService/TMDBMovieService');
const OMDBMovieService = require('../services/MovieService/OMDBMovieService');
const analysticService = require('../services/analyticsService');
const dynmoDbService = require('../storage/dynmoDbService');

let tmdbMovieService = new TMDBMovieService();
let oMDBMovieService = new OMDBMovieService();


exports.getMovieById = (req, res, next) => {
    let movieId = req.params.id
    tmdbMovieService.getMovieById(movieId).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.getMovieUpdates = async (req, res, next) => {
    try {
        let movieUpdates = await tmdbMovieService.getMovieUpdates(1);
        res.status(200).send(movieUpdates)
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getMoviePoster = async (req, res, next) => {
    let url = req.query.posterUrl;
    try {
        let moviePoster = await tmdbMovieService.getMoviePoster(url);
        res.status(200).sendFile(moviePoster)
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getMovieKeyPhrases = async (req, res, next) => {
    try {
        let movieId = req.params.id;
        let text = req.body.text;

        let dbValue = await dynmoDbService.getItemById(movieId);
        if (dbValue.Item.keyPhrases) {
            res.status(200).send(dbValue.Item.keyPhrases)
        }
        else {
            let result = await analysticService.getKeyPharases(text);
            let phrases = [];
            result.KeyPhrases.forEach(keyPhrase => {
                phrases.push(keyPhrase.Text)
            })

            await dynmoDbService.addMovieKeyPhrases(movieId, phrases);
            res.status(200).send(phrases);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getOMDBMovieByName = async (req, res, next) => {
    try{
        let movieName = req.params.name;
        let id = req.params.id;
        let result = await oMDBMovieService.getMovieByName(id, movieName);
        res.status(200).send(result)
    }
    catch(err){
        res.status(500).send(err);

    }
    
}
