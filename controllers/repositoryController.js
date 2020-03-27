
const axios = require('axios')

exports.getRepositories = (req, res, next) =>{
    let userName = req.params.userName;
    let url = 'https://api.github.com/users/' + userName;
    console.log(url);

}
