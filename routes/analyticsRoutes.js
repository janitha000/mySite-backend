const express = require('express')
const router = express.Router();

const analyticController = require('../controllers/analyticsController')

router.post('/sentiment', (req, res, next) => {
    analyticController.getSentiment(req,res,next);
})


module.exports = router;