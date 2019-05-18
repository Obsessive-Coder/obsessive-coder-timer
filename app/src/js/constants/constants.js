export const DEFAULT_TASKS = [
  {
    id: "b10823dd-2528-4408-8db6-b10e48b61889",
    description: "Learn Redux",
    isComplete: false
  },
  {
    id: "dc3f25e5-ba95-4098-b49c-6e0c84484999",
    description: "Make a Redux app",
    isComplete: false
  }
];

export const DEFAULT_TIMER_LENGTH = 10* 60;
export const DEFAULT_TIMER_SHORT_BREAK = 3 * 60;
export const DEFAULT_TIMER_LONG_BREAK = 15 * 60;

export const DEFAULT_TIMER = {
  timeLeft: DEFAULT_TIMER_LENGTH / 60,
  timerLength: DEFAULT_TIMER_LENGTH / 60,
  shortBreakLength: DEFAULT_TIMER_SHORT_BREAK / 60,
  longBreakLength: DEFAULT_TIMER_LONG_BREAK / 60,
  phase: 'pomodoro',
  isCounting: false,
  intervalCount: 0
};

export const FORBIDDEN_CHARACTERS = ["<", ">", "(", ")"];

export default {
  DEFAULT_TASKS,
  DEFAULT_TIMER,
  FORBIDDEN_CHARACTERS,
  DEFAULT_TIMER_LENGTH,
  DEFAULT_TIMER_SHORT_BREAK,
  DEFAULT_TIMER_LONG_BREAK
};
