class Alarm {
  constructor() {
    this.now = new Date();
    this.year = this.now.getFullYear();
    this.month = this.now.getMonth();
    this.day = this.now.getDate();
    this.hour = this.now.getHours();
    this.minute = this.now.getMinutes();
    this.seconds = this.now.getSeconds();
  }

  //finding specific time for alarm
  findTime(day, hour, minute) {
    console.log(day, hour, minute);
    const newDate = new Date(this.year, this.month, day, hour, minute);
    return {
      day: newDate.getDate(),
      hour: newDate.getHours(),
      minute: newDate.getMinutes(),
    };
  }

  sanitize(day, hour, minute, pm) {
    let d, h, m;
    if (pm) {
      h = parseInt(hour) < 12 ? parseInt(hour) + 12 : hour;
    } else {
      h = parseInt(hour) < 12 ? hour : parseInt(hour) + 12;
    }
    d = this.hour > h ? parseInt(day) + 1 : day;
    m = minute;
    return { d, h, m };
  }

  checking(prev, newDate) {
    console.log(prev, newDate);
    if (!prev.find((each) => each.time.day === newDate.day)) return false;
    if (!prev.find((each) => each.time.hour === newDate.hour)) return false;
    if (!prev.find((each) => each.time.minute === newDate.minute)) return false;
    return true;
  }

  //settting alarm by following different condition

  setAlarm(day, hour, minute, pm = false) {
    const { d, h, m } = this.sanitize(day, hour, minute, pm);
    const previous = localStorage.getItem("alarm")
      ? JSON.parse(localStorage.getItem("alarm"))
      : [];

      if(previous.length >=5){
        console.log("you cannot add more than five alarms");
        return;
    }

    const newDate = this.findTime(d, h, m);

    if (!this.checking(previous, newDate)) {
      const stringified = JSON.stringify([
        ...previous,
        { time: newDate, pm: pm, snoozed: 0 },
      ]);
      localStorage.setItem("alarm", stringified);
    }
  }
}

const date_selector = document.getElementById("date");
const hour_selector = document.getElementById("hour");
const minute_selector = document.getElementById("minute");
const am_pm_selector = document.getElementById("am_pm");
const submit_selector = document.getElementById("submit__form");

let options_hour = [];

//Setting dates
const current__date = new Alarm().day;
for (let i = current__date; i <= current__date + 7; i++) {
  if (i > 30) {
    i = i - 30;
  }
  date_selector.innerHTML += `<option value=${i}>${i}</option>`;
}

//Setting hours
for (let i = 11; i >= 1; i--) {
  hour_selector.innerHTML += `<option value=${i}>${i}</option>`;
}

//setting minutes

for (let i = 01; i <= 59; i++) {
  minute_selector.innerHTML += `<option value=${i}>${i}</option>`;
}

//keep the time updating
const keepUpdatingTime = () => {
  const alarm = new Alarm();

  const am_or_pm = alarm.hour > 11 && alarm.hour < 24 ? "PM" : "AM";
  const hour = alarm.hour > 12 ? alarm.hour - 12 : alarm.hour;

  document.querySelector(
    ".current_time"
  ).innerHTML = `${hour} : ${alarm.minute} : ${alarm.seconds} ${am_or_pm}`;

  document.querySelector(".current_date").innerHTML = `${alarm.day} / ${
    alarm.month + 1
  } / ${alarm.year}`;
};

setInterval(() => {
  keepUpdatingTime();
}, 1000);

//submision work =======================================================

let selected__date = date_selector.value;
date_selector.onchange = (e) => {
  selected__date = e.target.value;
};
let selected__hour = hour_selector.value;
hour_selector.onchange = (e) => {
  selected__hour = e.target.value;
};
let selected__minute = minute_selector.value;
minute_selector.onchange = (e) => {
  selected__minute = e.target.value;
};
let selected__am_pm = am_pm_selector.value;
am_pm_selector.onchange = (e) => {
  selected__am_pm = e.target.value;
};

submit_selector.addEventListener("submit", (event) => {
  event.preventDefault();
  const alarm = new Alarm();
  const am_pm = selected__am_pm === "pm" ? true : false;
  alarm.setAlarm(selected__date, selected__hour, selected__minute, am_pm);
  window.location.reload();
});

///showing given alarms===========================

const updateAlarms = () => {
  const given_alarms = document.querySelector(".given__alarms ul");
  const alarms = localStorage.getItem("alarm") ? JSON.parse(localStorage.getItem("alarm")): [];
  
   given_alarms.innerHTML = "";

  for (let i = 0; i < alarms.length; i++) {
    given_alarms.innerHTML += `<li id=${i}>${alarms[i].time.hour >12? alarms[i].time.hour - 12 : alarms[i].time.hour}H: ${alarms[i].time.minute}M: ${alarms[i].pm ? "PM" : "AM"} (Date:${alarms[i].time.day}) <span class="cross">X</span></li>`;
  }
};

updateAlarms();


//delete
let cross = document.querySelectorAll('.cross');

cross.forEach((each,i) => {
  each.onclick = (e) => {
    console.log(i);
    const previous = JSON.parse(localStorage.getItem("alarm"));
    previous.splice(i,1);
    console.log(previous);
     localStorage.setItem("alarm", JSON.stringify(previous))
     window.location.reload();
  }
})
console.log(cross);
