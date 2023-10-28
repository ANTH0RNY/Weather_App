import {
  createSetElement,
  createSafeElement,
  appendChildren,
} from "../util.js";

function createCondition(obj) {
  const wrapper = createSetElement("div", {
    class: "condition",
  });
  const text = obj.text;
  const icon = obj.icon;

  const textDiv = createSafeElement(
    "p",
    {
      class: "text",
    },
    text,
  );
  const iconImg = createSafeElement("img", {
    class: "image",
    src: `http:${icon}`,
    alt:"cloud condition"
  });
  appendChildren(wrapper, [iconImg, textDiv]);

  return wrapper;
}

export default createCondition;
