import "./style.css";
import thermometerSrc from "./assets/img/icons/thermometer.svg";
import rainSrc from "./assets/img/icons/rain.svg";
import raindropSrc from "./assets/img/icons/raindrop.svg";
import windSrc from "./assets/img/icons/wind.svg";
import {
  fillCurrentWeatherElements,
  fillCurrentWeatherDescElements,
  fillforecastWeatherElements,
  fillCurrentWeatherCityCountry,
} from "./dom";

const app = {
  init: () => {
    document.getElementById("search-btn").addEventListener("click", (e) => {
      e.preventDefault();
      app.fetchWeather(e);
    });
    document
      .getElementById("return-btn")
      .addEventListener("click", app.mainScreenActive);
    app.weatherDesc();
  },
  fetchWeather: (ev) => {
    let cityName = document.getElementById("search-input").value;
    if (cityName.trim() == "") return;
    if (!ev.target.closest(".search-btn")) return;
    const key = "135c67825987bafb2b6286a00bc0ce1f";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fillCurrentWeatherCityCountry(data);
        app.oneCall(data, key);
      })
      .catch((error) => {
        const errorMsg = document.getElementById("error");
        errorMsg.classList.add("active");
      });
  },
  forecastScreenActive: () => {
    const mainScreen = document.getElementById("main-screen");
    const forecastScreen = document.getElementById("forecast-screen");
    const searchButton = document.getElementById("search-btn");
    const returnButton = document.getElementById("return-btn");

    searchButton.classList.remove("active");
    mainScreen.classList.remove("active");
    forecastScreen.classList.add("active");
    returnButton.classList.add("active");
  },
  mainScreenActive: () => {
    const mainScreen = document.getElementById("main-screen");
    const forecastScreen = document.getElementById("forecast-screen");
    const searchButton = document.getElementById("search-btn");
    const returnButton = document.getElementById("return-btn");
    const errorMsg = document.getElementById("error");

    forecastScreen.classList.remove("active");
    returnButton.classList.remove("active");
    errorMsg.classList.remove("active");
    searchButton.classList.add("active");
    mainScreen.classList.add("active");
  },
  oneCall: (data, key) => {
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${key}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(resp.statusText);
        return response.json();
      })
      .then((data) => {
        fillCurrentWeatherElements(data);
        fillCurrentWeatherDescElements(data);
        fillforecastWeatherElements(data);
        app.forecastScreenActive();
      });
  },
  weatherDesc: () => {
    const weatherDetailsIcon = document.querySelectorAll(
      ".weather-details-icon"
    );
    const iconsArray = [thermometerSrc, raindropSrc, rainSrc, windSrc];
    weatherDetailsIcon.forEach((item, index) => {
      let img = document.createElement("img");
      img.src = iconsArray[index];
      item.appendChild(img);
    });
  },
};

app.init();
