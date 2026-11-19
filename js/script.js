"use strict";

const delayButton = document.querySelector("#delay-button");
const delayedText = document.querySelector("#delayed-text");
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");
const secondsText = document.querySelector("#seconds");
const status = document.querySelector("#status");

let seconds = 10;
let timeoutId = null;
let intervalId = null;

// TODO 1. После нажатия запланируйте сообщение через 2000 мс.
// Сохраните идентификатор setTimeout в timeoutId.
delayButton.addEventListener("click", () => {
  delayedText.textContent = "Ожидаем сообщение...";
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    delayedText.textContent = "2 секунды прошло";
    timeoutId = null;
  }, 2000);
});
// TODO 2. Запустите setInterval с интервалом 1000 мс.
// Каждую секунду уменьшайте seconds на 1 и обновляйте secondsText.
// При достижении 0 остановите интервал через clearInterval().
// Не допускайте запуска второго интервала, пока работает первый.
startButton.addEventListener("click", () => {
  if (intervalId !== null || seconds === 0) return;
  status.textContent = "Идёт отсчёт";
  intervalId = setInterval(tick, 1000);
});
// TODO 3. Остановите текущий интервал, но сохраните число секунд.
pauseButton.addEventListener("click", () => {
  if (intervalId === null) return;
  clearInterval(intervalId);
  intervalId = null;
  status.textContent = "Пауза";
});
// TODO 4. Отмените оба таймера и восстановите исходное состояние.
resetButton.addEventListener("click", () => {
  clearTimeout(timeoutId);
  clearInterval(intervalId);
  timeoutId = null;
  intervalId = null;
  seconds = 10;
  secondsText.textContent = seconds;
  status.textContent = "Таймер готов";
  delayedText.textContent = "Сообщение не запланировано";
});
function tick() {
  seconds -= 1;
  secondsText.textContent = seconds;
  if (seconds === 0) {
    clearInterval(intervalId);
    intervalId = null;
    status.textContent = "Время вышло";
  }
}