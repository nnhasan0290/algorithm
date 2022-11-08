class Alarm {
  constructor() {
    this.now = new Date();
    this.year = this.now.getFullYear();
    this.month = this.now.getMonth();
    // this.day = this.now.getDate();
    this.hour = this.now.getHours();
    // this.minute = this.now.getMinutes();
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
    this.added__alarm.push({time:this.findTime(d,h,m), snooze: 0});
  }
}

const alarm = new Alarm();

alarm.setAlarm(8, 12, 20, true);
alarm.setAlarm(9, 12, 20, true);

console.log(alarm.added__alarm);


const hour_selector = document.getElementById("hour");
const minute_selector = document.getElementById("minute");

let options_hour = [];
