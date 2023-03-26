//This first var defines the API Key and sets it to a unique API Key that is require to make requests to the OpenWeather API
//This defines the apiUrl variable and sets it to the base URL of the OpenWeatherMap API endpoint that returns current weather data for a given location
var apiKey = "ddebf87b13631896a86e8390661e6714";
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
// The below will fetch data to forecast weather in the next 5 five days
var apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast';

// Purpose of all variables called below are to get a reference to the input element with the ID or class and stores it into the called variable such as 'cityNameInput'

var cityNameInput = document.querySelector('#city');
var searchButton = document.querySelector('.btn-light');
var searchForecastButton = document.querySelector('.btn-dark');
var cityName = document.querySelector('#city-name');
var weatherIcon = document.querySelector('#weather-icon');
var temperature = document.querySelector('#temperature');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#wind-speed');
var forecastTable = document.querySelector('#five-day-forecast');

// THIS IS FOR FUTURE WHEN ADDING LOCAL STORAGE
var savedCities = [];  

/* // Function to update the weather information in the HTML file */
    //this sets the text content --> 'cityName' element to the name of the city returned by the API 
    //'weatherIcon.src = xxx sets the source attribute of the 'weatherIcon' element in the URL 
    //'temperature.text.Content = xxx sets the text content of the temp = C (celcius degrees) + and the rounds the tempt results it to the nearest whole number 
    //humidity.textContent = sets the text.Content of the humidity element to a % value returned by the API
    //'windSpeed.textContent' = sets textContent of windSpeed element to the winde speed value returned by the API 

function updateWeatherData(data) {
  cityName.textContent = data.name;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  temperature.textContent = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

/* // Function to fetch weather data for the entered city */
    //the fetch url method makes a request to the weatherAPI 
    //the .then method is called on the reponse object returned from the fetch() - then we take 'response' object as an argument and call the 'json() method to convert this into JSON format
    //the second .then method is called on the JSON data returned from the above ^^ - then we take the 'data' object as an object and we pass it on to 'updateWeatherInfo() function to update weather in the UI 
    //the .catch method will handle any erorrs that may occur during the fetch request or JSON conversion

function getWeatherData(city) {
  var url = `${apiUrl}?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      updateWeatherData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

/* Function to update the weather information in the HTML file */
// var forecastData = filters the forecast data to only include items with a time of 12:00:00 (using the filter method of the 'list' property of the 'data' object)
// next function clears any data from from within the 'forecastTable' HTML element. Then it iteratws over the foltered forecastData array using the forEach method
// for each item, the function extracts date & time from 'dt_txt' property & formats it using 'toLocaleDateString' and 'toLocaledTimeString' methods
// then constructs the wweather icon 
// temp, humidity & windSpeed  are also extracted 
// then we create a new table row element 'tr' using the createElement method, then populates weather data and appends forecastTable to it 

function updateWeatherForecast(data) {
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
function getWeatherForecast(city) {
  var url = `${apiUrlForecast}?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
     updateWeatherForecast(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// This is the event listener to the searchButton element, which triggers a function when the button is clicked
// This gets the value of the cityNameInput input field & removes any leading or trailing whitespace characters using the trim() method, and stores the resulting city name in the city variable
// line 55 clears the 'cityNameInput' space/value so we can enter a new search in a clean space (SHOULD I ADD LOCA STORAGE HERE BEFORE CLEARING THE SEARCH??)
// line 57 checks if a valid city name was entered / if true, the getWeatherdata(city); will execute! 

searchButton.addEventListener('click', () => {
  var city = cityNameInput.value.trim();
  cityNameInput.value = '';
  if (city) {
    getWeatherData(city);
  }
});

// This is a second eventListener prompted by the 'keyup' in addition to 'click' in the function above
// DO I NEED BOTH?

cityNameInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    const city = cityNameInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  }
});

searchButton.addEventListener('click', () => {
  const city = cityNameInput.value.trim();
  if (city) {
    getWeatherData(city);
}
});


searchForecastButton.addEventListener('click', () => {
  var city = cityNameInput.value.trim();
  savedCities.push()
  cityNameInput.value = '';
  if (city) {
    getWeatherForecast(city);
  }
});





