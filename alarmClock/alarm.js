class Alarm {
  constructor() {
    this.now = new Date();
    this.year = this.now.getFullYear();
    this.month = this.now.getMonth();
     this.day = this.now.getDate();
    this.hour = this.now.getHours();
    this.minute = this.now.getMinutes();
    this.seconds = this.now.getSeconds();
    this.added__alarm = [];
  }

  //finding specific time for alarm
  findTime(day, hour, minute) {
    return new Date(this.year, this.month, day, hour, minute);
  }

  sanitize(day, hour, minute, pm) {
    let d, h, m;
    if (pm) {
      h = hour < 12 ? hour + 12 : hour;
    } else {
      h = hour < 12 ? hour : hour + 12;
    }
    d = this.hour > h ? day + 1 : day;
    m = minute;
    return { d, h, m };
  }

  //settting alarm by following different condition

  setAlarm(day, hour, minute, pm = false) {
    const { d, h, m } = this.sanitize(day, hour, minute, pm);
    this.added__alarm.push({ time: this.findTime(d, h, m), snooze: 0 });
  }
}

const hour_selector = document.getElementById("hour");
const minute_selector = document.getElementById("minute");

let options_hour = [];

//Setting hours
for (let i = 11; i >= 1; i--) {
  hour_selector.innerHTML += `<option>${i}</option>`;
}

//setting minutes

for (let i = 01; i <= 59; i++) {
  minute_selector.innerHTML += `<option>${i}</option>`;
}

//keep the time updating
const keepUpdatingTime = () => {
  const alarm = new Alarm();

  const am_or_pm = alarm.hour > 11 && alarm.hour <24 ? "PM" : "AM" 
  const hour = alarm.hour > 12 ? alarm.hour - 12 : alarm.hour ;

  document.querySelector(
    ".current_time"
  ).innerHTML = `${hour} : ${alarm.minute} : ${alarm.seconds} ${am_or_pm}`;

  document.querySelector(".current_date").innerHTML = `${alarm.day} / ${alarm.month} / ${alarm.year}`
};




setInterval(() => {
  keepUpdatingTime();
}, 1000);
