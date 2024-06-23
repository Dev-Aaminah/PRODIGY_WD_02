// Get references to DOM elements
const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("lap-clear-btn")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const lapsContainer = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

// Initialize variables for stopwatch state
let isPlay = false;
let min, sec, centiSec;
let secCounter = 0;
let centiCounter = 0;
let minCounter = 0;
let lapItem = 0;
let isReset = false;

// Function to toggle visibility of buttons
const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

// Function to handle play/pause functionality
const play = () => {
    if (!isPlay && !isReset) {
        // Start the stopwatch
        playButton.innerHTML = 'Pause';
        bg.classList.add("animation-bg");
        min = setInterval(() => {
            minute.innerHTML = `${++minCounter} :`;
        }, 60 * 1000);
        sec = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.innerHTML = `&nbsp;${++secCounter} :`;
        }, 1000);
        centiSec = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.innerHTML = `&nbsp;${++centiCounter} `;
        }, 10);
        isPlay = true;
        isReset = true;
    } else {
        // Pause the stopwatch
        playButton.innerHTML = 'Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
        isReset = false;
        bg.classList.remove("animation-bg");
    }
    toggleButton();
}

// Function to reset the stopwatch
const reset = () => {
    isReset = true;
    play();
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    second.innerHTML = '&nbsp;0 :';
    centiSecond.innerHTML = '&nbsp;0';
    minute.innerHTML = '0 :';
    secCounter = 0;
    centiCounter = 0;
    minCounter = 0;
}

// Function to record a lap time
const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timespan = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timespan.setAttribute("class", "time-stamp");

    number.innerHTML = `#${++lapItem}`;
    timespan.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

    li.append(number, timespan);
    lapsContainer.insertBefore(li, clearButton);

    clearButton.classList.remove("hidden");
}

// Function to clear all lap times
const clearAll = () => {
    lapsContainer.innerHTML = '';
    lapsContainer.append(clearButton);
    clearButton.classList.add("hidden");
    lapItem = 0;
}

// Add event listeners to buttons
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);