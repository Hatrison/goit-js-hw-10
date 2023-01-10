const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.disabled = true;
let intervalId = null;

body.addEventListener('click', onClick);

function onClick(event) {
  const target = event.target;
  if (!(target === startBtn || target === stopBtn)) return;
  if (target === startBtn) {
    intervalId = setInterval(changeBg, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else {
    clearInterval(intervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }

  function changeBg() {
    body.style.backgroundColor = getRandomHexColor();
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
