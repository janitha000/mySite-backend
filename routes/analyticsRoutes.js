const express = require('express')
const router = express.Router();

const analyticController = require('../controllers/analyticsController')
const {ValidateGoogle}  = require('../middleware/authMiddleware')

router.post('/sentiment', ValidateGoogle, (req, res, next) => {
    analyticController.getSentiment(req, res, next);
})


module.exports = router;