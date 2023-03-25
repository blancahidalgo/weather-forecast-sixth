//This first var defines the API Key and sets it to a unique API Key that is require to make requests to the OpenWeather API
//This defines the apiUrl variable and sets it to the base URL of the OpenWeatherMap API endpoint that returns current weather data for a given location
var apiKey = "ddebf87b13631896a86e8390661e6714";
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Purpose of all variables called below are to get a reference to the input element with the ID or class and stores it into the called variable such as 'cityNameInput'

var cityNameInput = document.querySelector('#city');
var searchButton = document.querySelector('.btn-light');
var cityName = document.querySelector('#city-name');
var weatherIcon = document.querySelector('#weather-icon');
var temperature = document.querySelector('#temperature');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#wind-speed');

/* // Function to update the weather information in the HTML file */
    //this sets the text content --> 'cityName' element to the name of the city returned by the API 
    //'weatherIcon.src = xxx sets the source attribute of the 'weatherIcon' element in the URL 
    //'temperature.text.Content = xxx sets the text content of the temp = C (celcius degrees) + and the rounds the tempt results it to the nearest whole number 
    //humidity.textContent = sets the text.Content of the humidity element to a % value returned by the API
    //'windSpeed.textContent' = sets textContent of windSpeed element to the winde speed value returned by the API 

function updateWeatherInfo(data) {
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
      updateWeatherInfo(data);
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
// DO I NEED BOTU?

cityNameInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    const city = cityNameInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  }
});
