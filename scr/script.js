// Current Day and Time

function formatDayTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let now = new Date();
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let today = document.querySelector("#current-date");
today.innerHTML = formatDayTime();

// Search Engine

function defaultCity(city) {
  let apiKey = "0b02db9e81bd4747b05a8fe268d2b9a4";
  let unit = "&units=metric";
  let searchApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${unit}`;
  axios.get(searchApiUrl).then(displayLocationWeather);
}

function displayCitySearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-bar");
  let city = `${searchInput.value}`;

  defaultCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", displayCitySearch);

function displayLocationWeather(response) {
  console.log(response);
  let location = document.querySelector("#city-name");
  location.innerHTML = `${response.data.name}`;

  let temp = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = `${temp}`;

  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = `Wind Speed: ${windSpeed} m/s`;

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = description;
}

function showLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "0b02db9e81bd4747b05a8fe268d2b9a4";
  let unit = "&units=metric";
  let positionApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}${unit}`;

  axios.get(positionApiUrl).then(displayLocationWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentLocation);

defaultCity("London");

// Unit Links - need to fix

//function changeToFarenheit(event) {
//event.preventDefault();

//let tempF = document.querySelector(".temp");
//tempF.innerHTML = `(${tempC} × 9/5) + 32`;
//}
//let farenheitLink = document.querySelector("#fahrenheit-link");
//farenheitLink.addEventListener("click", changeToFarenheit);

//function changeToCelsius(event) {
//event.preventDefault();

//let tempC = document.querySelector(".temp");
//tempC.innerHTML = `19`;
//}
//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", changeToCelsius);

// Current Location Button
