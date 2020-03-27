const authService = require('../services/authService')
const axios = require('axios')

exports.Register = (req, res, next) => {
    console.log('API called for registering user');
    authService.Register(req.body).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send({ 'Error': err });
    })
}

exports.Login = (req, res, next) => {
    console.log('API called for login');
    authService.Login(req.body).then(accesstoken => {
        res.status(200).send(accesstoken)
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.GetGoogleLoginUrl = (req, res, next) => {
    console.log('API called for getting google login auth url');
    let params = req.params;

    let url = authService.GetGoogleLoginUrl(params);
    res.send(url);
}

exports.GoogleLogin = (req, res, next) => {
    console.log('API called for google login');
    let code = req.query.code;

    let googleLoginUrl = authService.GoogleLogin(code);

}