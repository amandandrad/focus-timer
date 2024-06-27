import state from "./state.js";
import * as timer from "./timer.js";
import * as el from "./elements.js";
import * as sounds from "./sounds.js";

export function toggleRunning() {
  state.isRunning = document.documentElement.classList.toggle("running");
  timer.countdown();
}

export function reset() {
  state.isRunning = false;
  document.documentElement.classList.remove("running");
  timer.updateDisplay();
}

export function set() {
  el.seconds.textContent = "00";
  el.minutes.setAttribute("contenteditable", true);
  el.minutes.focus();
}

export function stop() {
  state.isRunning = false;
  document.documentElement.classList.remove("running");
  clearTimeout(state.countdownId);
}

export function alterarCSS(buttonId, colorVariable, sound) {
  const asideButton = document.getElementById(buttonId);
  const color = getComputedStyle(asideButton)
    .getPropertyValue(colorVariable)
    .trim();

  if (sound.paused && asideButton.style.backgroundColor !== color) {
    sounds.forest.pause();
    sounds.rain.pause();
    sounds.coffe.pause();
    sounds.fire.pause();

    forest.style.backgroundColor = "";
    rain.style.backgroundColor = "";
    coffee.style.backgroundColor = "";
    fire.style.backgroundColor = "";

    asideButton.style.backgroundColor = color;
    sound.currentTime = 0;
    sound.play();
  } else {
    sound.pause();
    asideButton.style.backgroundColor = "";
  }
}

document.getElementById("forest").addEventListener("click", function () {
  alterarCSS("forest", "--button-forest", sounds.forest);
});

document.getElementById("rain").addEventListener("click", function () {
  alterarCSS("rain", "--button-rain", sounds.rain);
});

document.getElementById("coffee").addEventListener("click", function () {
  alterarCSS("coffee", "--button-coffee", sounds.coffe);
});

document.getElementById("fire").addEventListener("click", function () {
  alterarCSS("fire", "--button-fire", sounds.fire);
});

//actions.js
