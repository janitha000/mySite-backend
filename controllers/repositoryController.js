
const axios = require('axios')
const {github} = require('../configs/env')

exports.getRepositories = (req, res, next) =>{
    let userName = req.params.userName;
    let url = github.userUrl + userName;
    console.log(url);

}
