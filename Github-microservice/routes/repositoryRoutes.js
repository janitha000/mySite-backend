const express = require('express')
const router = express.Router();

const repositoryController = require('../controllers/repositoryController')

router.get('/:userName', (req, res, next) => {
    repositoryController.getRepositories(req, res, next)
})

module.exports = router;