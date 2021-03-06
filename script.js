// Default Weather Info

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

// Weather Info

function displayLocationWeather(response) {
  let location = document.querySelector("#city-name");
  location.innerHTML = `${response.data.name}`;

  celsiusTemperature = response.data.main.temp;

  let currentTemperature = document.querySelector("#current-temp");
  let temp = Math.round(celsiusTemperature);
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

  let icon = document.querySelector("#weather-icon");
  let iconCode = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );

  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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

// Unit Links

function changeToFarenheit(event) {
  event.preventDefault();

  let tempF = document.querySelector("#current-temp");
  let cToFConversion = (celsiusTemperature * 9) / 5 + 32;
  tempF.innerHTML = Math.round(cToFConversion);

  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}

function changeToCelsius(event) {
  event.preventDefault();

  let tempC = document.querySelector("#current-temp");
  tempC.innerHTML = Math.round(celsiusTemperature);

  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

// Forecast HTML

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let dailyForecast = response.data.daily;

  let forecastHTML = `<div class="row forecast-row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="day-name">${formatDay(forecastDay.dt)}</div>
                
                <img 
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" 
                alt="" 
                id="forecast-icon"
                width="42" />

                <span class="forecast-temp" id="forecast-temp-max">
                  ${Math.round(forecastDay.temp.max)}??C /</span>
                  
                <span class="forecast-temp" id="forecast-temp-min">
                  ${Math.round(forecastDay.temp.min)}??C</span>  
                
              </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

// Forecast Unit Links

// Forecast Weather Info

function getForecast(coordinates) {
  let apiKey = "0b02db9e81bd4747b05a8fe268d2b9a4";
  let unit = "&units=metric";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

// Global Variables

let form = document.querySelector("#search-form");
form.addEventListener("submit", displayCitySearch);

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", changeToFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

defaultCity("London");
