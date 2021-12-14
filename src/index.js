import "./style.css";
import moment from "moment";
import thermometerSrc from "./assets/img/icons/thermometer.svg";
import rainSrc from "./assets/img/icons/rain.svg";
import raindropSrc from "./assets/img/icons/raindrop.svg";
import windSrc from "./assets/img/icons/wind.svg";
import _01dSrc from "./assets/img/icons/01d.svg";
import _01nSrc from "./assets/img/icons/01n.svg";
import _02dSrc from "./assets/img/icons/02d.svg";
import _02nSrc from "./assets/img/icons/02n.svg";
import _03dSrc from "./assets/img/icons/03d.svg";
import _03nSrc from "./assets/img/icons/03n.svg";
import _04dSrc from "./assets/img/icons/04d.svg";
import _04nSrc from "./assets/img/icons/04n.svg";
import _09dSrc from "./assets/img/icons/09d.svg";
import _09nSrc from "./assets/img/icons/09n.svg";
import _10dSrc from "./assets/img/icons/10d.svg";
import _10nSrc from "./assets/img/icons/10n.svg";
import _11dSrc from "./assets/img/icons/11d.svg";
import _11nSrc from "./assets/img/icons/11n.svg";
import _13dSrc from "./assets/img/icons/13d.svg";
import _13nSrc from "./assets/img/icons/13n.svg";
import _50dSrc from "./assets/img/icons/50d.svg";
import _50nSrc from "./assets/img/icons/50n.svg";
import { getCityTime } from "./time";

const weatherGif = document.querySelector("#weather-gif");
const weatherDetailsIcon = document.querySelectorAll(".weather-details-icon");
const iconsArray = [thermometerSrc, raindropSrc, rainSrc, windSrc];
const apiKey = "135c67825987bafb2b6286a00bc0ce1f";
let cityName = "moscow";

const currentWeatherCity = document.getElementById("current-weather-city");
const currentWeatherCountry = document.getElementById(
  "current-weather-country"
);
const currentWeatherDate = document.getElementById("current-weather-date");
const currentWeatherTime = document.getElementById("current-weather-time");
const currentWeatherDesc = document.getElementById("current-weather-desc");
const currentWeatherGifContainer = document.getElementById(
  "current-weather-gif-container"
);
const currentWeatherGif = document.createElement("img");
let weatherReport = fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
  { mode: "cors" }
);

const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const chanceOfRain = document.getElementById("chance-of-rain");
const windSpeed = document.getElementById("wind-speed");

const forecastDate = document.querySelectorAll("#date");
const forecastWeatherGif = document.querySelectorAll("#weather-gif");
const forecastWeatherdesc = document.querySelectorAll("#forecast-weather-desc");
const forecastH = document.querySelectorAll("#forecast-H");
const forecastL = document.querySelectorAll("#forecast-L");
weatherReport
  .then((response) => {
    let report = response.json();
    return report;
  })
  .then((response) => {
    currentWeatherCity.textContent = response.name;
    currentWeatherCountry.textContent = response.sys.country;
    let lat = response.coord.lat;
    let lon = response.coord.lon;

    let oneCall = fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
    );
    return oneCall;
  })
  .then((response) => {
    let report = response.json();
    return report;
  })
  .then((response) => {
    humidity.textContent = `${response.current.humidity} %`;
    feelsLike.textContent = `${Math.round(response.current.feels_like)} °C`;
    currentWeatherGif.src = `${getIcon(response.current.weather[0].icon)}`;
    currentWeatherGifContainer.appendChild(currentWeatherGif);
    currentWeatherDesc.textContent = `${response.current.weather[0].description}`;
    windSpeed.textContent = `${
      Math.round(response.current.wind_speed * 3.6 * 10) / 10
    } Km/h`;
    chanceOfRain.textContent = `${response.daily[0].pop} %`;
    const dt = response.current.dt; // unix timestamp in seconds
    const timezone = response.timezone_offset; // zone in seconds
    const cityTime = getCityTime(response.timezone_offset);
    let currentLocalTime = moment(cityTime).format("LT");
    currentWeatherTime.textContent = currentLocalTime;

    let currentLocalDate = moment(cityTime).format("dddd, Do MMM 'YY.");
    currentWeatherDate.textContent = currentLocalDate;

    forecastDate.forEach((item, index) => {
      if (index < 6) {
        item.textContent = moment
          .unix(response.daily[index + 1].dt)
          .format("dddd");
      }
    });
    forecastWeatherGif.forEach((item, index) => {
      if (index < 6) {
        let img = document.createElement("img");
        img.src = `${getIcon(response.daily[index + 1].weather[0].icon)}`;
        item.appendChild(img);
      }
    });
    forecastWeatherdesc.forEach((item, index) => {
      if (index < 6) {
        item.textContent = response.daily[index + 1].weather[0].description;
      }
    });
    forecastH.forEach((item, index) => {
      if (index < 6) {
        item.textContent = ` ${response.daily[index + 1].temp.max}°H`;
      }
    });
    forecastL.forEach((item, index) => {
      if (index < 6) {
        item.textContent = ` ${response.daily[index + 1].temp.max}°L`;
      }
    });
  });

function addInformation() {
  weatherDetailsIcon.forEach((item, index) => {
    let img = document.createElement("img");
    img.src = iconsArray[index];
    item.appendChild(img);
  });
}
addInformation();

function getIcon(code) {
  switch (code) {
    case "01d":
      return _01dSrc;
      break;
    case "01n":
      return _01nSrc;
      break;
    case "02d":
      return _02dSrc;
      break;
    case "02n":
      return _02nSrc;
      break;
    case "03d":
      return _03dSrc;
      break;
    case "03n":
      return _03nSrc;
      break;
    case "04d":
      return _04dSrc;
      break;
    case "04n":
      return _04nSrc;
      break;
    case "09d":
      return _09dSrc;
      break;
    case "09n":
      return _09nSrc;
      break;
    case "10d":
      return _10dSrc;
      break;
    case "10n":
      return _10nSrc;
      break;
    case "11d":
      return _11dSrc;
      break;
    case "11n":
      return _11nSrc;
      break;
    case "13d":
      return _13dSrc;
      break;
    case "13n":
      return _13nSrc;
      break;
    default:
      return;
  }
}
