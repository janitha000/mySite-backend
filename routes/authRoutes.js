const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController')

router.post('/login', (req, res, next) => {
    authController.Login(req, res, next)
})

router.post('/register', (req, res, next) => {
    authController.Register(req, res, next)
})

module.exports = router;