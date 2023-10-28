import { setAttributes } from "../util";
import forecastItem from "./forecastItem";

function mainForecast(el, list) {
  let currentState = 0;
  const len = list.length;
  list.forEach((element, index) => {
    const forecastItemEl = forecastItem(element, element.time);
    setAttributes(forecastItemEl, {
      "data-pos": index,
    });
    el.appendChild(forecastItemEl);
  });
  const left = document.querySelector(".left-arw");
  const right = document.querySelector(".right-arw");
  const windowWrapper = document.querySelector(".window-wrapper");

  right.addEventListener("click", (e) => {
    if (currentState + 1 >= len) return;
    //  console.log("right");
    const transform = `translateX(${778.7 - (currentState + 1) * 68}vw)`;
    // console.log(`${currentState} ${transform}`);
    currentState++;
    windowWrapper.style.transform = transform;
  });
  left.addEventListener("click", (e) => {
    if (currentState <= 0) return;
    const currentTransform = windowWrapper.style.transform;
    const start = parseInt(currentTransform.indexOf("(")) + 1;
    const end = parseInt(currentTransform.indexOf("v"));
    const transValue = parseFloat(currentTransform.slice(start, end));

    // console.log(transValue);
    const transform = `translateX(${transValue + 68}vw)`;
    console.log(
      `currentState: ${currentState}\n trnasform: ${transform}\n value ${
        778.7 + currentState * 68
      }`,
    );
    currentState--;
    windowWrapper.style.transform = transform;
  });
}

export default mainForecast;
