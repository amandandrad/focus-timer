import state from "./state.js";
import { controls } from "./elements.js";
import * as actions from "./actions.js";
import * as el from "./elements.js";
import { updateDisplay } from "./timer.js";
import * as sounds from "./sounds.js";

export function registerControls() {
  controls.addEventListener("click", (event) => {
    sounds.buttonPressAudio.play();
    const action = event.target.dataset.action;
    if (typeof actions[action] != "function") {
      return;
    }

    actions[action]();
  });
}

export function setMinutes() {
  el.minutes.addEventListener("focus", () => {
    el.minutes.textContent = "";
  });

  el.minutes.onkeypress = (event) => /\d/.test(event.key);

  el.minutes.addEventListener("blur", (event) => {
    let time = event.currentTarget.textContent;
    time = time > 60 ? 60 : time;

    state.minutes = time;
    state.seconds = 0;

    updateDisplay();
    el.minutes.removeAttribute("contenteditable");
  });
}

export function addMinutes() {
  const buttonAdd = document.querySelector(".ph.ph-plus-circle");
  const buttonRemove = document.querySelector(".ph.ph-minus-circle");

  buttonAdd.addEventListener("click", () => {
    const currentSeconds = state.seconds;
    state.minutes += 5;
    updateDisplay(state.minutes, currentSeconds);
  });

  buttonRemove.addEventListener("click", () => {
    const currentSeconds = state.seconds;
    state.minutes = Math.max(0, state.minutes - 5);
    updateDisplay(state.minutes, currentSeconds);
  });
}

//events.js
