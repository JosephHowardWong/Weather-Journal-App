
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
}
if(mm<10){
    mm='0'+mm
}
today = yyyy+'-'+mm+'-'+dd;


const btn = document.querySelector('#generate');

            
btn.addEventListener('click', async () => {
                
    const zip = document.querySelector('#zip').value;
    const feeling = document.querySelector('#feeling').value;

    const resp1 = await postToServe('/getWeather', {zip});
    // console.log(resp1)

    if(resp1.message == 'city not found') {

        const failedFetch = document.querySelector('#error');
        failedFetch.classList.remove('hide');
        failedFetch.innerHTML = '<i class="fas fa-exclamation-triangle fa-2x"></i>City not found on Open Weather, please try again';

    } else {

        const {humidity} = resp1;
        const {lat} = resp1;
        const {lon} = resp1;
        const {name} = resp1;
        const {pressure} = resp1;
        const {speed} = resp1;
        const {temp} = resp1;
        const {MAPQUEST_KEY} = resp1;
        
        // console.log(lat,lon, name, temp, speed, pressure, humidity, MAPQUEST_KEY);
        
        updateUI({humidity, lat, lon, name, pressure, speed, temp}, feeling);
        
        loadMap(lat, lon, MAPQUEST_KEY);
    }
})

// update UI function
const updateUI = ({humidity, lat, lon, name, pressure, speed, temp}, userFeel) => {

    // console.log(humidity, lat, lon, name, pressure, speed, temp, userFeel);
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

    dateEl.innerHTML = `Date:   ${today}`;
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
        // console.log(resp)
        const response = await resp.json();
        // console.log(response)
        return response;
    }catch(error) {
        console.log(`error: ${error}`);
    }
}


// loading map from mapquest API
// this code was copied and pasted from mapquest sample code
const loadMap = (lati, long, MAPQUEST_KEY) => {
    L.mapquest.key = MAPQUEST_KEY;

    var map = L.mapquest.map('map', {
        center: [lati, long],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
    });

    map.addControl(L.mapquest.control());
}
