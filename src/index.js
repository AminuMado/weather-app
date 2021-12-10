import "./style.css";
const apiKey = "135c67825987bafb2b6286a00bc0ce1f";
let cityName = "Abuja";

let weatherReport = fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
  { mode: "cors" }
);

weatherReport
  .then((response) => {
    let report = response.json();
    return report;
  })
  .then((response) => {
    console.log(response);
  });

// console.log(weatherReport);
