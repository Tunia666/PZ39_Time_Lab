// Переменные для Задания 1 (Отложенное сообщение)
let timeoutId = null;

// Переменные для Заданий 2, 3, 4 (Обратный отсчет)
let intervalId = null;
let seconds = 10;

// Элементы DOM, полученные строго по ID из вашей HTML-верстки
const delayButton = document.getElementById('delay-button');
const delayMessage = document.getElementById('delayed-text');

const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const secondsText = document.getElementById('seconds');
const countdownMessage = document.getElementById('status');

// === ЗАДАНИЕ 1: Отложенное сообщение ===
delayButton.addEventListener('click', () => {
    // Если таймаут уже запущен, очищаем его перед созданием нового
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
        delayMessage.textContent = "Прошло 2 секунды! Сообщение появилось.";
    }, 2000);
});

// === ЗАДАНИЕ 2 и 3: Старт отсчета и защита от дублирования ===
startButton.addEventListener('click', () => {
    // Задание 3: Защита кнопки «Старт» от повторного запуска, если интервал уже работает
    if (intervalId !== null) {
        return; 
    }

    countdownMessage.textContent = "Отсчёт пошёл...";

    // Задание 2: Запуск интервала обратного отсчета (1000 мс)
    intervalId = setInterval(() => {
        seconds--;
        secondsText.textContent = seconds;

        // При значении 0 останавливаем интервал и выводим сообщение о завершении
        if (seconds === 0) {
            clearInterval(intervalId);
            intervalId = null; // Освобождаем ID для возможности перезапуска в будущем
            countdownMessage.textContent = "Время вышло! Отсчет завершен.";
        }
    }, 1000);
});

// === ЗАДАНИЕ 4: Пауза отсчета ===
pauseButton.addEventListener('click', () => {
    // Задание 4: Останавливаем интервал без сброса сохраненного числа секунд
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null; // Обнуляем переменную ID, чтобы кнопка «Старт» снова могла сработать
        countdownMessage.textContent = "Таймер на паузе.";
    }
});

// === ЗАДАНИЕ 5: Сброс всего состояния ===
resetButton.addEventListener('click', () => {
    // 1. Отменяем отложенное сообщение и возвращаем исходный текст
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    delayMessage.textContent = "Сообщение ещё не запланировано";

    // 2. Отменяем интервал обратного отсчета
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    // 3. Восстанавливаем число 10, исходные сообщения и значения идентификаторов таймеров
    seconds = 10;
    secondsText.textContent = seconds;
    countdownMessage.textContent = "Таймер готов к запуску.";
});