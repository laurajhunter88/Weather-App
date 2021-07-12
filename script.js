//Default Weather Info

function defaultCity(city) {
  let apiKey = "0b02db9e81bd4747b05a8fe268d2b9a4";
  let unit = "&units=metric";
  let searchApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${unit}`;
  axios.get(searchApiUrl).then(displayLocationWeather);
}

// Search Engine

function displayCitySearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-bar");
  let city = `${searchInput.value}`;

  defaultCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", displayCitySearch);

// Weather Info

function displayLocationWeather(response) {
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

  let date = document.querySelector("#current-date");
  date.innerHTML = formatDayTime(response.data.dt * 1000);
}

// Current Day and Time

function formatDayTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return ` Last updated: ${day} ${hours}:${minutes}`;
}

// Current Location Button

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
