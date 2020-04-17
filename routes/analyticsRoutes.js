const express = require('express')
const router = express.Router();

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const analyticController = require('../controllers/analyticsController')
const {ValidateGoogle}  = require('../middleware/authMiddleware')
const {checkJwt} = require('../middleware/auth0Middleware')


router.post('/sentiment', checkJwt, (req, res, next) => {
    analyticController.getSentiment(req, res, next);
})

router.post('/calculation', checkJwt, (req, res, next) => {
    analyticController.getCalculation(req, res, next);
})

module.exports = router;

