import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const input = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() <= 0) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', startCountdown);
    }

    function startCountdown(event) {
      if (intervalId) return;
      intervalId = setInterval(() => {
        const differenceInTime = selectedDates[0] - new Date();
        console.log(differenceInTime);
        if (differenceInTime < 1000) {
          Notify.success('Congratulations! Your wait is over!');
          days.textContent = '00';
          hours.textContent = '00';
          minutes.textContent = '00';
          seconds.textContent = '00';
          clearInterval(intervalId);
        }
        const convertedSelectedDate = convertMs(differenceInTime);
        days.textContent = String(addLeadingZero(convertedSelectedDate.days));
        hours.textContent = String(addLeadingZero(convertedSelectedDate.hours));
        minutes.textContent = String(
          addLeadingZero(convertedSelectedDate.minutes)
        );
        seconds.textContent = String(
          addLeadingZero(convertedSelectedDate.seconds)
        );
      }, 1000);
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
