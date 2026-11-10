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

delayButton.addEventListener("click", () => { 
  delayedText.textContent = "Ожидаем сообщение..."; 

  clearTimeout(timeoutId);  

  timeoutId = setTimeout(() => {  
    delayedText.textContent = "Сообщение появилось!"; 
  }, 2000); 
}); 

startButton.addEventListener("click", () => { 

  if (intervalId !== null) return;  

  status.textContent = "Таймер запущен";  

  intervalId = setInterval(() => {  
    seconds--;  
    secondsText.textContent = seconds;  

    if (seconds <= 0) { 
      clearInterval(intervalId);  
      intervalId = null;  
      status.textContent = "Время вышло!";  
    } 
  }, 1000); 
}); 

pauseButton.addEventListener("click", () => { 
  if (intervalId !== null) {  
    clearInterval(intervalId);  
    intervalId = null;  
    status.textContent = "Таймер на паузе"; 
  } 
}); 
  
resetButton.addEventListener("click", () => {
  clearTimeout(timeoutId);
  clearInterval(intervalId);
  
  timeoutId = null;
  intervalId = null;
  
  seconds = 10;
  secondsText.textContent = seconds;
  delayedText.textContent = "";
  status.textContent = "Таймер сброшен";
});
