var apiKey = "ddebf87b13631896a86e8390661e6714";
var apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast';

var cityNameInput = document.querySelector('#city');
var searchForecastButton = document.querySelector('.btn-dark');
var cityName = document.querySelector('#city-name');
var weatherIcon = document.querySelector('#weather-icon');
var temperature = document.querySelector('#temperature');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#wind-speed');
var forecastTable = document.querySelector('#five-day-forecast');

var savedCities = [];

/* Function to update the weather information in the HTML file */
// var forecastData = filters the forecast data to only include items with a time of 12:00:00 (using the filter method of the 'list' property of the 'data' object)
// next function clears any data from from within the 'forecastTable' HTML element. Then it iteratws over the foltered forecastData array using the forEach method
// for each item, the function extracts date & time from 'dt_txt' property & formats it using 'toLocaleDateString' and 'toLocaledTimeString' methods
// then constructs the wweather icon 
// temp, humidity & windSpeed  are also extracted 
// then we create a new table row element 'tr' using the createElement method, then populates weather data and appends forecastTable to it 

function updateWeatherInfo(data) {
  var forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
  forecastTable.innerHTML = '';
  forecastData.forEach(item => {
    var tr = document.createElement('tr');
    var date = new Date(item.dt_txt);
    var day = date.toLocaleDateString('en-US', { weekday: 'short' });
    var time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    var iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
    var temp = Math.round(item.main.temp - 273.15);
    var humidity = item.main.humidity;
    var windSpeed = item.wind.speed;
    tr.innerHTML = `
      <td>${day} ${time}</td>
      <td><img src="${iconUrl}" alt="${item.weather[0].description}"></td>
      <td>${temp}°C</td>
      <td>${humidity}%</td>
      <td>${windSpeed} m/s</td>
    `;
    forecastTable.appendChild(tr);
  });
}


// this function will fetch weather data just like in the main script.js file 
function getWeatherData(city) {
  var url = `${apiUrlForecast}?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
     updateWeatherInfo(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// same as script. js
searchForecastButton.addEventListener('click', () => {
  var city = cityNameInput.value.trim();
  savedCities.push()
  cityNameInput.value = '';
  if (city) {
    getWeatherData(city);
  }
});

// same as script. js
cityNameInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    const city = cityNameInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  }
});

// // Check if there is weather data stored in localStorage and update the weather information
// if (localStorage.getItem('weatherData')) {
//     updateWeatherInfo();
//   }
  