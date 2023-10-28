import createLocation from "./components/location";
import itemScale from "./components/temp.js";
import createCondition from "./components/condition.js";
import "./sass/main.scss";
import "./sass/current.scss";
import "./sass/forecast.scss";
// import forecastItem from "./components/forecastItem";
import mainForecast from "./components/forecastMain";

console.log("Hello world");

function createUrl(location) {
  return `https://api.weatherapi.com/v1/current.json?key=3255cbbf2f9b4a59aae54223231410&q=${location}`; //&days=2`;
}
function createForecastUrl(location, day = 1) {
  return `https://api.weatherapi.com/v1/forecast.json?key=3255cbbf2f9b4a59aae54223231410&q=${location}&days=${day}`;
}

async function sendBasicRequest(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

const btn = document.querySelector(".form-btn");
const input = document.querySelector(".form-input");
const location = document.querySelector(".location");
const current = document.querySelector(".current");
const foreCast = document.querySelector(".forecast");
const windowWrapper = document.querySelector(".window-wrapper");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value) {
    sendBasicRequest(createForecastUrl(input.value)).then((val) => {
      if (!val.error) {
        console.log(JSON.stringify(val, null, 2));
        createLocation(location, val.location);

        current.innerHTML = "";
        current.innerHTML="<h3>Current Weather</h3>"
        const temps = [
          {
            value: val.current.temp_c,
            unit: `<span class="unit">C</span><span>&#176;</span>`,
          },
          {
            value: val.current.temp_f,
            unit: `<span class="unit">F</span><span>&#176;</span>`,
          },
        ];
        /*Temp scale*/
        const tempScale = itemScale(
          temps,
          "temp-scale",
          "<h3>Temperature</h3>",
        );
        current.appendChild(tempScale);
        const condtionObject = { ...val.current.condition };
        const conditionElement = createCondition(condtionObject);
        current.appendChild(conditionElement);
        const precipVal = [
          {
            value: val.current.precip_mm,
            unit: `<span class="precip-unit">mm</span>`,
          },
          {
            value: val.current.precip_in,
            unit: `<span class="precip-unit">in</span>`,
          },
        ];
        const precipScale = itemScale(
          precipVal,
          "precip",
          "<h3>Precipitation</h3>",
        );
        current.appendChild(precipScale);
        const feelsLike = [
          {
            value: val.current.feelslike_c,
            unit: "<span>C</span><span>&#176;</span>",
          },
          {
            value: val.current.feelslike_f,
            unit: "<span>F</span><span>&#176;</span>",
          },
        ];
        const feelsEl = itemScale(
          feelsLike,
          "feels-like",
          "<h3>Feels like</h3>",
        );
        current.append(feelsEl);

        const visData = [
          {
            value: val.current.vis_km,
            unit: "<span>Km</span>",
          },
          {
            value: val.current.vis_miles,
            unit: "<span>Miles</span>",
          },
        ];
        const visEl = itemScale(visData, "visibility", "<h3>Visibility</h3>");
        current.appendChild(visEl);

        const gustData = [
          {
            value: val.current.gust_kph,
            unit: "<span>Km</span>",
          },
          {
            value: val.current.gust_mph,
            unit: "<span>Mph</span>",
          },
        ];
        const gustEl = itemScale(gustData, "gust", "<h3>Gust</h3>");
        current.appendChild(gustEl);

        // const forecastItemEl = forecastItem(val.forecast.forecastday[0].hour[0])
        // foreCast.appendChild(forecastItemEl)
        // console.log(forecastItemEl);
        mainForecast(windowWrapper, val.forecast.forecastday[0].hour);
      }
    });
    input.value = "";
    input.focus();
  }
});
