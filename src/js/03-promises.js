import { Notify } from "notiflix/build/notiflix-notify-aio";

const options = {
  position: 'top-right',
  borderRadius: '5px',
  distance: '15px',
  timeout: 10000,
  clickToClose: true,
  cssAnimationStyle: 'from-right',
};

const form = document.querySelector('.form');

form.addEventListener('submit', onCreatePress);

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
};

function onCreatePress(e) {
  e.preventDefault();
  let delayValue = Number(document.querySelector('input[name="delay"]').value);
  let stepValue = Number(document.querySelector('input[name="step"]').value);
  let amountValue = Number(document.querySelector('input[name="amount"]').value);
  

  for (let i = 1; i <= amountValue; i += 1){
    delayValue += stepValue;

    createPromise(i, delayValue)
    .then(({ position, delay }) => {
      Notify.success((`✅ Fulfilled promise ${position} in ${delay}ms`), options);
    })
    .catch(({ position, delay }) => {
      Notify.failure((`❌ Rejected promise ${position} in ${delay}ms`), options);
    });
  };
  e.currentTarget.reset();
};


