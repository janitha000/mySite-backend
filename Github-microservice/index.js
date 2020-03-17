const express = require('express');

const app = express();
const port = 3001;

app.get('/', (req, res) => res.send({status: "Welcome to my site github integration"}));

app.listen(port, () => {
    console.log('Application is running and listening on port 3001')
})