import {
  createSafeElement,
  createSetElement,
  appendChildren,
} from "../util.js";

function itemScale(list = []) {
  /*
   * list should be a list of objects
   * The object should have value and unit
   * Value should be an int
   * unit should be html
   * default object is index 0*/
  if (!list || list.length <= 0 || !(list instanceof Array)) return;

  const defaultObject = list[0];
  const length = list.length;

  const wrap = createSetElement("div", {
    class: "temp-wrapper",
    "data-state": "0",
  });
  const num = createSetElement("p", {
    class: "temp-num",
  });
  const unit = createSetElement("p", {
    class: "temp-unit",
  });
  const btn = createSetElement("btn", {
    class: "temp-btn",
  });
  /*Feeding default value*/
  num.innerText = defaultObject.value;
  unit.innerHTML = defaultObject.unit;
  btn.innerText = `change unit`;
  appendChildren(wrap, [num, unit, btn]);

  btn.addEventListener("click", (e) => {
    const currentState = parseInt(wrap.dataset.state);
    const currentObject = list[(currentState + 1) % length];
    num.innerText = currentObject.value;
    unit.innerHTML = currentObject.unit;
    // wrap.dataset.state = `${currentState++}`;
    wrap.dataset.state++;
  });

  return wrap;
}

export default itemScale;