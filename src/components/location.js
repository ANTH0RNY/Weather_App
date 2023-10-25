// import exports from "webpack";
import { getElement, createSetElement, createSafeElement } from "../util";

function createLocation(el, location) {
  el.innerHTML = "";
  const included = ["name", "region", "country", "lat", "lon", "localtime"];
  for (const [key, val] of Object.entries(location)) {
    if (included.includes(key)) {
      if (
        (typeof val === "string" || val instanceof String) &&
        val.length <= 0
      ) {
        continue;
      }
      const item = createSafeElement(
        "p",
        { class: `location-item ${key}` },
        key === "localtime" ? new Date(val).toLocaleString() : val,
      );
      el.appendChild(item);
    }
  }
}

export default createLocation;
