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
    document
      .getElementById("search-btn")
      .addEventListener("click", app.fetchWeather);
    document
      .getElementById("return-btn")
      .addEventListener("click", app.mainScreenActive);
    app.weatherDesc();
  },
  fetchWeather: (ev) => {
    //use the values from latitude and longitude to fetch the weather
    // let lat = document.getElementById("latitude").value;
    // let lon = document.getElementById("longitude").value;
    // let lang = "en";
    // let units = "metric";

    let cityName = document.getElementById("search-input").value;

    if (cityName.trim() == "") return;
    if (!ev.target.closest(".search-btn")) return;
    const key = "135c67825987bafb2b6286a00bc0ce1f";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;
    //fetch the weather
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

// import moment from "moment";
// import thermometerSrc from "./assets/img/icons/thermometer.svg";
// import rainSrc from "./assets/img/icons/rain.svg";
// import raindropSrc from "./assets/img/icons/raindrop.svg";
// import windSrc from "./assets/img/icons/wind.svg";
// import { getCityTime } from "./time";
// import { getIcon } from "./icon";

// const weatherDetailsIcon = document.querySelectorAll(".weather-details-icon");
// const iconsArray = [thermometerSrc, raindropSrc, rainSrc, windSrc];
// const apiKey = "135c67825987bafb2b6286a00bc0ce1f";
// let cityName = "";

// const currentWeatherCity = document.getElementById("current-weather-city");
// const currentWeatherCountry = document.getElementById(
//   "current-weather-country"
// );
// const currentWeatherDate = document.getElementById("current-weather-date");
// const currentWeatherTime = document.getElementById("current-weather-time");
// const currentWeatherDesc = document.getElementById("current-weather-desc");
// const currentWeatherGifContainer = document.getElementById(
//   "current-weather-gif-container"
// );
// const currentWeatherGif = document.createElement("img");

// const feelsLike = document.getElementById("feels-like");
// const humidity = document.getElementById("humidity");
// const chanceOfRain = document.getElementById("chance-of-rain");
// const windSpeed = document.getElementById("wind-speed");

// const forecastDate = document.querySelectorAll("#date");
// const forecastWeatherGif = document.querySelectorAll("#weather-gif");
// const forecastWeatherdesc = document.querySelectorAll("#forecast-weather-desc");
// const forecastH = document.querySelectorAll("#forecast-H");
// const forecastL = document.querySelectorAll("#forecast-L");

// function addInformation() {
//   weatherDetailsIcon.forEach((item, index) => {
//     let img = document.createElement("img");
//     img.src = iconsArray[index];
//     item.appendChild(img);
//   });
// }
// addInformation();

// // Event Listeners
// const mainScreen = document.getElementById("main-screen");
// const forecastScreen = document.getElementById("forecast-screen");
// const searchButton = document.getElementById("search-btn");
// const returnButton = document.getElementById("return-btn");
// const searchInput = document.getElementById("search-input");
// const errorMsg = document.getElementById("error");

// searchButton.addEventListener("click", (e) => {
//   if (searchInput.value.trim() != "") {
//     cityName = searchInput.value;

//     if (e.target.closest(".search-btn")) {
//       let weatherReport = fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
//         { mode: "cors" }
//       );

//       weatherReport
//         .then((response) => {
//           console.log(response);
//           let report = response.json();
//           return report;
//         })
//         .then((response) => {
//           console.log(response);
//           currentWeatherCity.textContent = response.name;
//           currentWeatherCountry.textContent = response.sys.country;
//           let lat = response.coord.lat;
//           let lon = response.coord.lon;
//           let oneCall = fetch(
//             `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
//           );
//           return oneCall;
//         })
//         .then((response) => {
//           let report = response.json();
//           return report;
//         })
//         .then((response) => {
//           console.log(response);
//           humidity.textContent = `${response.current.humidity} %`;
//           feelsLike.textContent = `${Math.round(
//             response.current.feels_like
//           )} °C`;
//           currentWeatherGif.src = `${getIcon(
//             response.current.weather[0].icon
//           )}`;
//           currentWeatherGifContainer.appendChild(currentWeatherGif);
//           currentWeatherDesc.textContent = `${response.current.weather[0].description}`;
//           windSpeed.textContent = `${
//             Math.round(response.current.wind_speed * 3.6 * 10) / 10
//           } Km/h`;
//           chanceOfRain.textContent = `${response.daily[0].pop} %`;
//           const dt = response.current.dt; // unix timestamp in seconds
//           const timezone = response.timezone_offset; // zone in seconds
//           const cityTime = getCityTime(response.timezone_offset);
//           let currentLocalTime = moment(cityTime).format("LT");
//           currentWeatherTime.textContent = currentLocalTime;

//           let currentLocalDate = moment(cityTime).format("dddd, Do MMM 'YY.");
//           currentWeatherDate.textContent = currentLocalDate;

//           forecastDate.forEach((item, index) => {
//             if (index < 6) {
//               item.textContent = moment
//                 .unix(response.daily[index + 1].dt)
//                 .format("dddd");
//             }
//           });
//           forecastWeatherGif.forEach((item, index) => {
//             if (index < 6) {
//               item.textContent = "";
//               let img = document.createElement("img");
//               img.src = `${getIcon(response.daily[index + 1].weather[0].icon)}`;
//               item.appendChild(img);
//             }
//           });
//           forecastWeatherdesc.forEach((item, index) => {
//             if (index < 6) {
//               item.textContent =
//                 response.daily[index + 1].weather[0].description;
//             }
//           });
//           forecastH.forEach((item, index) => {
//             if (index < 6) {
//               item.textContent = ` ${response.daily[index + 1].temp.max}°H`;
//             }
//           });
//           forecastL.forEach((item, index) => {
//             if (index < 6) {
//               item.textContent = ` ${response.daily[index + 1].temp.max}°L`;
//             }
//           });
//           forecastScreenActive();
//         })
//         .catch((error) => {
//           errorMsg.classList.add("active");
//         });
//     }
//   }
// });
// returnButton.addEventListener("click", (e) => {
//   if (e.target.closest(".return-btn")) {
//     mainScreenActive();
//   }
// });

// function forecastScreenActive() {
//   searchButton.classList.remove("active");
//   mainScreen.classList.remove("active");

//   forecastScreen.classList.add("active");
//   returnButton.classList.add("active");
// }
// function mainScreenActive() {
//   forecastScreen.classList.remove("active");
//   errorMsg.classList.remove("active");
//   returnButton.classList.remove("active");
//   searchButton.classList.add("active");
//   mainScreen.classList.add("active");
// }
// // function clearAll() {
// //   currentWeatherCity.textContent = "";
// //   currentWeatherCountry.textContent = "";
// //   forecastL.textContent = "";
// //   forecastH.textContent = "";
// //   forecastWeatherdesc.textContent = "";
// //   forecastWeatherGif.textContent = "";
// //   forecastDate.textContent = "";
// //   currentWeatherDate.textContent = "";
// //   currentWeatherTime.textContent = "";
// //   chanceOfRain.textContent = "";
// //   windSpeed.textContent = "";
// //   feelsLike.textContent = "";
// //   humidity.textContent = "";
// //   searchInput.value = "";
// // }
