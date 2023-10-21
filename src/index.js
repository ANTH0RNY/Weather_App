console.log("Hello world");

function createUrl(location) {
  return `https://api.weatherapi.com/v1/current.json?key=3255cbbf2f9b4a59aae54223231410&q=${location}`; //&days=2`;
}

async function sendBasicRequest(url) {
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  return json;
}

// sendBasicRequest(createUrl("kisumu"));
const btn = document.querySelector(".form-btn");
const input = document.querySelector(".form-input");
const dump = document.querySelector(".json");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value) {
    sendBasicRequest(createUrl(input.value)).then((val) => {
      dump.innerText = JSON.stringify(val, 3);
    });
  }
});
input.addEventListener("keyup", (e) => {
  console.log(e);
});
