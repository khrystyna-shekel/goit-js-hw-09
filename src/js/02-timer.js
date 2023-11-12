import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from "notiflix/build/notiflix-report-aio";


const calendar = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');

btn.setAttribute('disabled', 'true');
let userSelectedDate = null;
let currentDate = null;
let intervalId = null;

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
        console.log(selectedDates[0]); 
        
    if (selectedDates[0].getTime() < Date.now()) {
        Report.failure('Timer failed:(', 'Please choose a date in the future!', 'Okay');
    } else {
        btn.removeAttribute('disabled');
        Report.success('Congrats:)', 'Click on start!', 'Okay');
        const setTimer = () => {
            userSelectedDate = selectedDates[0].getTime();
            timer.start()
        };
        btn.addEventListener('click', setTimer);
      };
  },
});

const timer = {
    rootSelector: document.querySelector('.timer'),

    start() {
        intervalId = setInterval(() => {
            btn.disabled = true;
            calendar.disabled = true;
            const deadline = userSelectedDate - Date.now();
            
            if (deadline <= 0) {
                this.stop();
                Report.info('Timer stopped!', 'If you want to start timer, choose a date and click on start or reload this page.',
                    'Okay');
                return;
            };
            
            const { days, hours, minutes, seconds } = this.convertMs(deadline);
            this.rootSelector.querySelector('[data-days]').textContent = this.addLeadingZero(days);
            this.rootSelector.querySelector('[data-hours]').textContent = this.addLeadingZero(hours);
            this.rootSelector.querySelector('[data-minutes]').textContent = this.addLeadingZero(minutes);
            this.rootSelector.querySelector('[data-seconds]').textContent = this.addLeadingZero(seconds);
        }, 1000);
    },

    stop() {
        clearInterval(intervalId);
        this.intervalId = null;
        btn.disabled = false;
        calendar.disabled = false;
    },

    convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = this.addLeadingZero(Math.floor(ms / day));
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
    },
    
    addLeadingZero(value) {
        return String(value).padStart(2, 0);
    },
};