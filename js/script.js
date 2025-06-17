import "es6-promise/auto";
import "nodelist-foreach-polyfill";

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calc from "./modules/calc";

window.addEventListener("DOMContentLoaded", () => {
  tabs(
    ".tabContent",
    ".tabHeaderItems",
    ".tabHeaderItem",
    "tabHeaderItemActive"
  );
  modal("[data-modal]", ".modal");
  timer("2025-05-20");
  cards();
  forms("form");
  slider({
    prevArrow: ".sliderPrev",
    container: ".slide",
    nextArrow: ".sliderNext",
    currentCounter: "#current",
    totalCounter: "#total",
    wrapper: ".sliderWrapper",
    inner: ".sliderInner",
    slide: ".slider",
  });
  calc();
});
