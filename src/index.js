import createLocation from "./components/location";
import itemScale from "./components/temp.js";
import createCondition from "./components/condition.js";
import "./sass/main.scss";
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

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value) {
    sendBasicRequest(createForecastUrl(input.value)).then((val) => {
      if (!val.error) {
        console.log(JSON.stringify(val, null, 2));
        createLocation(location, val.location);

        current.innerHTML = "";
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
        const tempScale = itemScale(temps, "temp-scale");
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
        const precipScale = itemScale(precipVal);
        current.appendChild(precipScale);
      }
    });
    input.value = "";
    input.focus();
  }
});
