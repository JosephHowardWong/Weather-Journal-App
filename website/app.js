const OW_KEY = '';
const MAPQUEST_KEY = '';

const zip = document.querySelector('#zip');

const feeling = document.querySelector('#feeling');

const btn = document.querySelector('#generate');

const fetchReq = async (url) => {
    const resp = await fetch(url);
    if(resp.status == 200) {
        const data = await resp.json();
        return data;
    } else {
        const failedFetch = document.querySelector('#error');
        failedFetch.classList.remove('hide');
        failedFetch.innerHTML = `<i class="fas fa-exclamation-triangle fa-2x"></i>Request to Open Weather failed with ${resp.status} please try again`;
    }
}


// 1   fetching data from Open Weather
// 2   posting to server
// 3   fetching from server
// 4   updating UI with data
const updateJournal = async (e) => {
    e.preventDefault();
    
    const userFeel = feeling.value;
    const zipCode = zip.value;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${OW_KEY}&units=imperial`;
    
    const weathInfo = await fetchReq(url);
    
    const {lat} = weathInfo.coord;
    const {lon} = weathInfo.coord;
    const {name} = weathInfo;
    const {temp} = weathInfo.main;
    const {pressure} = weathInfo.main;
    const {humidity} = weathInfo.main;
    const {speed} = weathInfo.wind;

    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

    const message = await postToServe('/add', {newDate, lat, lon, name, temp, pressure, humidity, speed });

    const DataFromServ = await fetch('/retrieve').then( (serverData) => serverData.json());

    updateUI(DataFromServ, userFeel);    
}


// on buttong click, do necessary steps and update UI
btn.addEventListener('click', updateJournal);


// update UI function
const updateUI = ({newDate, humidity, lat, lon, name, pressure, speed, temp}, userFeel) => {

    // console.log(newDate, humidity, lat, lon, name, pressure, speed, temp, userFeel);
    const entryTitle = document.querySelector('.entry-title');
    entryTitle.classList.remove('hide');

    const dateEl = document.querySelector('#date');
    const cityEl = document.querySelector('#city');
    const tempEl = document.querySelector('#temp');
    const contentEl = document.querySelector('#content');
    const humidEl = document.querySelector('#humidity');
    const speedEl = document.querySelector('#speed');
    const pressEl = document.querySelector('#pressure');
    const errorEl = document.querySelector('#error');

    dateEl.innerHTML = `Date:   ${newDate}`;
    cityEl.innerHTML = `City:   ${name}`;
    tempEl.innerHTML = `Temperature:   ${temp} degrees Fahrenheit`;
    humidEl.innerHTML = `Humidity:   ${humidity}%`;
    speedEl.innerHTML = `Wind Speed:   ${speed} meters/sec`;
    pressEl.innerHTML = `Pressure:   ${pressure} hPa`;
    contentEl.innerHTML = `How you felt on this day:   ${userFeel}`;
    
    errorEl.classList.add('hide');

    const weathElements = Array.from(document.querySelectorAll('.ui-data'));

    weathElements.forEach(weathEl => {
        if(errorEl.classList.contains('hide')) {
            weathEl.classList.remove('hide');
        }
    })

    loadMap(lat, lon);
}

// post to server
const postToServe = async (url='', data={}) => {
    
    const resp = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try{
        const response = await resp.json();
        return response;
    }catch(error) {
        console.log(`error: ${error}`);
    }
}


// loading map from mapquest API
// this code was copied and pasted from mapquest sample code
const loadMap = (lati, long) => {
    L.mapquest.key = MAPQUEST_KEY;

    var map = L.mapquest.map('map', {
        center: [lati, long],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
    });

    map.addControl(L.mapquest.control());
}
