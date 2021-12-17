import thermometerSrc from "./assets/img/icons/thermometer.svg";
import rainSrc from "./assets/img/icons/rain.svg";
import raindropSrc from "./assets/img/icons/raindrop.svg";
import windSrc from "./assets/img/icons/wind.svg";
import {
  fillCurrentWeatherElements,
  fillCurrentWeatherDescElements,
  fillforecastWeatherElements,
} from "./dom";
const app = {
  init: () => {
    document
      .getElementById("search-btn")
      .addEventListener("click", app.fetchWeather);
    document
      .getElementById("return-btn")
      .addEventListener("click", app.mainScreenActive);
    weatherDesc();
  },
  fetchWeather: (ev) => {
    //use the values from latitude and longitude to fetch the weather
    // let lat = document.getElementById("latitude").value;
    // let lon = document.getElementById("longitude").value;
    // let lang = "en";
    // let units = "metric";
    let cityName = document.getElementById("searchInput").value;
    if (cityName.trim() == "") return;
    if (!ev.target.closest(".search-btn")) return;
    const key = "135c67825987bafb2b6286a00bc0ce1f";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;
    //fetch the weather
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(resp.statusText);
        return response.json();
      })
      .then((data) => {
        app.oneCall(data);
        forecastScreenActive();
      })
      .catch(console.err);
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
  oneCall: (data) => {
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
