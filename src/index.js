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
  //  console.log(json);
  return json;
}

// sendBasicRequest(createForecastUrl("kisumu"));
const btn = document.querySelector(".form-btn");
const input = document.querySelector(".form-input");
// const dump = document.querySelector(".json");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value) {
    sendBasicRequest(createForecastUrl(input.value)).then((val) => {
      // dump.innerText = JSON.stringify(val, null, 2);
      if (!val.error) {
        // console.log("hello");
        console.log(JSON.stringify(val, null, 2));
        fillLocation(val.location);

      }
    });
    input.value = "";
    input.focus();
  }
});

function fillLocation(location) {
  const name = document.querySelector(".name");
  innerText(name, location.name);
  const region = document.querySelector(".region");
  innerText(region, location.region);
  const country = document.querySelector(".country");
  innerText(country, location.country);
  const lat = document.querySelector(".lat");
  innerText(lat, location.lat);
  const lon = document.querySelector(".lon");
  innerText(lon, location.lon);
  const localTime = document.querySelector(".localTime");
  innerText(localTime, location.localtime);
}

function innerText(el, val = "") {
  if (val.length !== 0) {
    el.classList.remove("not-visible");
    el.innerText = val;
  } else {
    el.classList.add("not-visible");
  }
}
