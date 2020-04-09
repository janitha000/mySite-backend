const express = require('express')
const router = express.Router();
const passport = require('passport')

const authController = require('../controllers/authController')
const auth0Controller = require('../controllers/auth0Controller')

router.post('/login', (req, res, next) => {
    authController.Login(req, res, next)
})

router.post('/register', (req, res, next) => {
    authController.Register(req, res, next)
})

router.get('/google', (req, res, next) => {
    authController.GetGoogleLoginUrl(req, res, next);
})

router.get('/google/login', (req, res, next) => {
    authController.GoogleLogin(req, res, next);
})

router.get('/auth0/login', passport.authenticate("auth0", { scope : "openid email profile" }), (req, res) => {
    res.redirect('/')
})

router.get('/auth0/callback', (req, res, next) => {
    auth0Controller.callback(req, res, next);
})

module.exports = router;