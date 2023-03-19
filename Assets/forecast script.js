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


/* Function to update the weather information in the HTML file */

function updateWeatherInfo(data) {
 var data = JSON.parse(localStorage.getItem('weatherData'));
 console.log(data)
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
/* // Function to fetch weather data for the entered city */

function getWeatherData(city) {
  var url = `${apiUrlForecast}?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
     localStorage.setItem('weatherData', JSON.stringify(data));
     updateWeatherInfo(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Event listener for the search button

searchForecastButton.addEventListener('click', () => {
  var city = cityNameInput.value.trim();
  cityNameInput.value = '';
  if (city) {
    getWeatherData(city);
  }
});

// Event listener for the Enter key press in the city search input
cityNameInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    const city = cityNameInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  }
});

