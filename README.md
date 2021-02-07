# WEATHER JOURNAL APP

## This is Udacity Project #3

### The requirements are:

- set up a local node / express server installing cors, body-parser, and express

- create a front end website with form fields prompting the user to type in a zipcode and how they were feeling on that day

- use that zip code and a valid API key to fetch weather data from [Open Weather](https://openweathermap.org/)

- send the data received from Open Weather via a post request to the back end express server

- make a get request to the back end express server to obtain data for front end use

- update the UI using server data and the users feelings

### BONUS: Map Quest API to generate local map

- as an added bonus, there is another outgoing fetch request made to [mapquest](https://developer.mapquest.com/) with an additional API key

The following code was used to generate a local map taken from the sample code at [https://developer.mapquest.com/documentation/mapquest-js/v1.3/examples/basic-map/]

```javascript
<script type="text/javascript">
      window.onload = function() {
        L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

        var map = L.mapquest.map('map', {
          center: [37.7749, -122.4194],
          layers: L.mapquest.tileLayer('map'),
          zoom: 12
        });

        map.addControl(L.mapquest.control());
      }
</script>
```

where latitude and longitude were obtained from the Open Weather data and then subsequently passed in to the mapquest API to generate the map

I learned a lot from Brad Traversy's YouTube video on maps [https://www.youtube.com/watch?v=9FQrFah9rnc&t=2627s]
