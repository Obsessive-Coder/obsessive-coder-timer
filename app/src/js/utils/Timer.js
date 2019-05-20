export default class Timer {
  constructor(pomodoroLength, shortBreakLength, longBreakLength) {
    this.pomodoroLength = pomodoroLength;
    this.shortBreakLength = shortBreakLength;
    this.longBreakLength = longBreakLength;
    this.timeLeft = 0;
    this.status = "stopped";
    this.intervalCount = 0;
  }

  get pomodoroLength() {
    return this.pomodoroLength;
  }

  set pomodoroLength(length) {
    this.pomodoroLength = length;
  }

  get shortBreakLength() {
    return this.shortBreakLength;
  }

  set shortBreakLength(length) {
    this.shortBreakLength = length;
  }

  get longBreakLength() {
    return this.longBreakLength;
  }

  get timeLeft() {
    return this.timeLeft;
  }

  set timeLeft(timeLeft) {
    this.timeLeft = timeLeft;
  }

  get status() {
    return this.status;
  }

  set status(status) {
    this.status = status;
  }

  get intervalCount() {
    return this.intervalCount;
  }

  set intervalCount(intervalCount) {
    this.intervalCount = intervalCount;
  }
}
