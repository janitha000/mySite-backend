
const axios = require('axios')

exports.getRepositories = (req, res, next) =>{
    let userName = req.params.userName;
    let url = 'https://api.github.com/users/' + userName;
    console.log(url);

    axios.get(url).then(response => {
        console.log(response)
        res.status(200).send(response.data)
    }).catch(err => {
        console.log('ERROR ' + err);
        res.status(500).send(err);
    })
}
