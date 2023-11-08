const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
stopBtn.setAttribute('disabled', 'true');
let intervalId;

startBtn.addEventListener('click', e => {
    intervalId = setInterval(bodyBgColor, 1000);
    const timerId = setTimeout(bodyBgColor, 0);
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', e => {
    clearInterval(intervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true; 
});

function bodyBgColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

