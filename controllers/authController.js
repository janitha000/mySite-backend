const authService = require('../services/authService')

exports.Register = (req, res, next) => {
    console.log('API called for registering user');
    authService.Register(req.body).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send({'Error': err});
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