import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.addEventListener('click', onSubmit);

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      res({ position, delay });
    } else {
      // Reject
      rej({ position, delay });
    }
  });
}

function onSubmit(event) {
  const delay = Number(document.querySelector('input[name="delay"]').value);
  const step = Number(document.querySelector('input[name="step"]').value);
  const amount = Number(document.querySelector('input[name="amount"]').value);

  submitBtn.disabled = true;
  setTimeout(() => (submitBtn.disabled = false), delay + step * (amount - 1));

  for (let i = 1; i <= amount; i++) {
    const count = i;
    const time = delay + (i - 1) * step;
    setTimeout(() => {
      createPromise(count, time)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, time);
  }
}
