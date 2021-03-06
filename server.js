const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


PORT = process.env.PORT || 5000;

server = app.listen(PORT, console.log(`Server listening on port ${PORT}`));

app.use(express.static('website'));

app.get('/', (req,res) => {
    res.send('website/index.html')
})

const {MAPQUEST_KEY} = process.env

app.post('/getWeather', async (req,res) => {
    console.log(req.body);
    const {zip} = req.body;

    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${process.env.OW_KEY}&units=imperial`;
    
    const resp = await fetch(url);
    const weathInfo = await resp.json()

    // console.log(weathInfo);

    if(weathInfo.message == 'city not found') {
        // console.log(weathInfo.message)
        const {message} = weathInfo;
        res.send({message});
       
    } else {

        const {lat} = weathInfo.coord;
        const {lon} = weathInfo.coord;
        const {name} = weathInfo;
        const {temp} = weathInfo.main;
        const {speed} = weathInfo.wind;
        const {pressure} = weathInfo.main;
        const {humidity} = weathInfo.main;
        
        // console.log(lat,lon, name, temp, speed, pressure, humidity);
        
        res.send({lat, lon, name, temp, speed, pressure, humidity, MAPQUEST_KEY})
    }
})
