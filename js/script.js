"use strict";

const delayButton = document.querySelector("#delay-button");
const repeatButton = document.querySelector("#repeat-button");
const delayedText = document.querySelector("#delayed-text");
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");
const secondsText = document.querySelector("#seconds");
const status = document.querySelector("#status");

let seconds = 10;
let timeoutId = null;
let intervalId = null;

function scheduleDelayedMessage() {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }

  delayedText.textContent = "Ожидаем сообщение...";

  timeoutId = setTimeout(() => {
    delayedText.textContent = "Время вышло! Отложенное сообщение появилось.";
    timeoutId = null;
  }, 2000);
}

delayButton.addEventListener("click", () => {
  scheduleDelayedMessage();
});

if (repeatButton) {
  repeatButton.addEventListener("click", () => {
    scheduleDelayedMessage();
  });
}

startButton.addEventListener("click", () => {
  if (intervalId !== null) {
    return;
  }

  if (seconds === 0) {
    seconds = 10;
    secondsText.textContent = String(seconds);
  }

  status.textContent = "Идёт обратный отсчёт...";

  intervalId = setInterval(() => {
    seconds -= 1;
    secondsText.textContent = String(seconds);

    if (seconds <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      status.textContent = "Отсчёт завершён!";
    }
  }, 1000);
});

pauseButton.addEventListener("click", () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
    status.textContent = "Таймер на паузе.";
  }
});

resetButton.addEventListener("click", () => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }

  seconds = 10;
  secondsText.textContent = "10";
  delayedText.textContent = "Сообщение ещё не запланировано";
  status.textContent = "Таймер готов к запуску.";
});

