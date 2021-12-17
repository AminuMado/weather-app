import moment from "moment";
import { getCityTime } from "./time";
import { getIcon } from "./icon";

//Current Weather Elements
const currentWeatherCity = document.getElementById("current-weather-city");
const currentWeatherCountry = document.getElementById(
  "current-weather-country"
);
function fillCurrentWeatherCityCountry(weatherData) {
  currentWeatherCity.textContent = weatherData.name;
  currentWeatherCountry.textContent = weatherData.sys.country;
}
//note we have two functions because the country and city name is gotten from the first api call

const currentWeatherDate = document.getElementById("current-weather-date");
const currentWeatherTime = document.getElementById("current-weather-time");
const currentWeatherDesc = document.getElementById("current-weather-desc");
const currentWeatherGif = document.createElement("img");
const currentWeatherGifContainer = document.getElementById(
  "current-weather-gif-container"
);
function fillCurrentWeatherElements(weatherData) {
  const cityTime = getCityTime(weatherData.timezone_offset);
  currentWeatherDate.textContent = moment(cityTime).format("dddd, Do MMM 'YY.");
  currentWeatherTime.textContent = moment(cityTime).format("LT");
  currentWeatherDesc.textContent = `${weatherData.current.weather[0].description}`;
  currentWeatherGif.src = `${getIcon(weatherData.current.weather[0].icon)}`;
  currentWeatherGifContainer.appendChild(currentWeatherGif);
}

// Current Weather Desc Elements
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const chanceOfRain = document.getElementById("chance-of-rain");
const windSpeed = document.getElementById("wind-speed");

function fillCurrentWeatherDescElements(weatherData) {
  humidity.textContent = `${weatherData.current.humidity} %`;
  feelsLike.textContent = `${Math.round(weatherData.current.feels_like)} °C`;
  chanceOfRain.textContent = `${weatherData.daily[0].pop} %`;
  windSpeed.textContent = `${
    Math.round(weatherData.current.wind_speed * 3.6 * 10) / 10
  } Km/h`;
}

// Forecast Weather Elements
const forecastDate = document.querySelectorAll("#date");
const forecastH = document.querySelectorAll("#forecast-H");
const forecastL = document.querySelectorAll("#forecast-L");
const forecastWeatherGif = document.querySelectorAll("#weather-gif");
const forecastWeatherdesc = document.querySelectorAll("#forecast-weather-desc");

function fillforecastWeatherElements(weatherData) {
  forecastDate.forEach((item, index) => {
    if (index < 6) {
      item.textContent = moment
        .unix(weatherData.daily[index + 1].dt)
        .format("dddd");
    }
  });
  forecastWeatherGif.forEach((item, index) => {
    if (index < 6) {
      item.textContent = "";
      let img = document.createElement("img");
      img.src = `${getIcon(weatherData.daily[index + 1].weather[0].icon)}`;
      item.appendChild(img);
    }
  });
  forecastWeatherdesc.forEach((item, index) => {
    if (index < 6) {
      item.textContent = weatherData.daily[index + 1].weather[0].description;
    }
  });
  forecastH.forEach((item, index) => {
    if (index < 6) {
      item.textContent = ` ${weatherData.daily[index + 1].temp.max}°H`;
    }
  });
  forecastL.forEach((item, index) => {
    if (index < 6) {
      item.textContent = ` ${weatherData.daily[index + 1].temp.max}°L`;
    }
  });
}

export {
  fillCurrentWeatherCityCountry,
  fillCurrentWeatherElements,
  fillCurrentWeatherDescElements,
  fillforecastWeatherElements,
};
