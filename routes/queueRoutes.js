const express = require('express')
const router = express.Router();

const queueController = require('../controllers/queueController')

router.post('/', (req, res, next) => {
    queueController.addToQueue(req,res,next);
})


module.exports = router;