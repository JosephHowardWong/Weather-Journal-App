const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

dotenv.config( { path: './config.env' });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('website'));

PORT = process.env.PORT || 5000;


server = app.listen(PORT, console.log(`Server listening on port ${PORT}`));


projectData = {};


app.post('/add', (req, res) => {
    projectData = req.body;
    console.log('post on back end received');
    console.log(projectData);
    res.send({message: 'post successfully recieved on back end'});
})


app.get('/retrieve', (req, res) => {
    res.send(projectData);
})
