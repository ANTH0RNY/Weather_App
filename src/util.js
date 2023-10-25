function getElement (selector) {
    return document.querySelector(selector);
  }
  
  function createElement (type) {
    return document.createElement(type);
  }
  
  function setAttributes (element, attributes) {
    // Object.entries(attributes).forEach()
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }
  }
  
  function createSetElement (type, attributes = {}) {
    const element = createElement(type);
    setAttributes(element, attributes);
    return element;
  }
  
  function createFullElement (type, attributes = {}, content = '') {
    const element = createSetElement(type, attributes);
    element.innerHTML = content;
    return element;
  }
  function appendChildren (el, children = []) {
    children.forEach((value) => {
      el.appendChild(value);
    });
  }
  function createSafeElement(type, attributes={}, content=''){
    const element = createSetElement(type, attributes);
    element.innerText = content;
    return element;
  }
  export {
    getElement,
    createElement,
    setAttributes,
    createSetElement,
    createFullElement,
    appendChildren,
    createSafeElement
  };
  