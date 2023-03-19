var apiKey = "ddebf87b13631896a86e8390661e6714";
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

var cityNameInput = document.querySelector('#city');
var searchButton = document.querySelector('.btn-light');
var cityName = document.querySelector('#city-name');
var weatherIcon = document.querySelector('#weather-icon');
var temperature = document.querySelector('#temperature');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#wind-speed');

/* Function to update the weather information in the HTML file */

function updateWeatherInfo(data) {
  cityName.textContent = data.name;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  temperature.textContent = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

/* // Function to fetch weather data for the entered city */

function getWeatherData(city) {
  var url = `${apiUrl}?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      updateWeatherInfo(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Event listener for the search button

searchButton.addEventListener('click', () => {
  var city = cityNameInput.value.trim();
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

