import { createSetElement } from "../util";
import itemScale from "./temp";
import createCondition from "./condition";

function forecastItem(val, Time = "") {
  const wrapper = createSetElement("div", {
    class: "forecast-item",
  });
  const container = createSetElement('div',{
    class: 'forecast-container'
  })
  // wrapper.innerHTML = "";
  // if (Time.length > 0) {
     const title = Time.split(" ")[1];
  
    const timeTitle = createSetElement("h3", {
    class: "time-title",
    });
    timeTitle.innerText = title;
    container.appendChild(timeTitle);
    container.appendChild(wrapper)
  // console.log(title);
  // }
  const temps = [
    {
      value: val.temp_c,
      unit: `<span class="unit">C</span><span>&#176;</span>`,
    },
    {
      value: val.temp_f,
      unit: `<span class="unit">F</span><span>&#176;</span>`,
    },
  ];

  /*Temp scale*/
  const tempScale = itemScale(temps, "temp-scale", "<h3>Temperature</h3>");

  wrapper.appendChild(tempScale);
  const conditionObject = { ...val.condition };

  const conditionElement = createCondition(conditionObject);
  wrapper.appendChild(conditionElement);

  const precipVal = [
    {
      value: val.precip_mm,
      unit: `<span class="precip-unit">mm</span>`,
    },
    {
      value: val.precip_in,
      unit: `<span class="precip-unit">in</span>`,
    },
  ];
  const precipScale = itemScale(precipVal, "precip", "<h3>Precipitation</h3>");
  wrapper.appendChild(precipScale);
  const feelsLike = [
    {
      value: val.feelslike_c,
      unit: "<span>C</span><span>&#176;</span>",
    },
    {
      value: val.feelslike_f,
      unit: "<span>F</span><span>&#176;</span>",
    },
  ];
  const feelsEl = itemScale(feelsLike, "feels-like", "<h3>Feels like</h3>");
  wrapper.append(feelsEl);

  const visData = [
    {
      value: val.vis_km,
      unit: "<span>Km</span>",
    },
    {
      value: val.vis_miles,
      unit: "<span>Miles</span>",
    },
  ];
  const visEl = itemScale(visData, "visibility", "<h3>Visibility</h3>");
  wrapper.appendChild(visEl);

  const gustData = [
    {
      value: val.gust_kph,
      unit: "<span>Km</span>",
    },
    {
      value: val.gust_mph,
      unit: "<span>Mph</span>",
    },
  ];
  const gustEl = itemScale(gustData, "gust", "<h3>Gust</h3>");
  wrapper.appendChild(gustEl);
  return container;
}

export default forecastItem;
