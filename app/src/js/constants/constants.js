export const DEFAULT_TASKS = [
  {
    id: "b10823dd-2528-4408-8db6-b10e48b61889",
    description: "Learn Redux",
    isComplete: true
  },
  {
    id: "dc3f25e5-ba95-4098-b49c-6e0c84484999",
    description: "Make a Redux app",
    isComplete: true
  }
];

export const DEFAULT_POMODORO_LENGTH = 25 * 60;
export const DEFAULT_POMODORO_SHORT_BREAK = 5 * 60;
export const DEFAULT_POMODORO_LONG_BREAK = 30 * 60;

export const DEFAULT_POMODORO = {
  pomodoroLength: DEFAULT_POMODORO_LENGTH,
  shortBreakLength: DEFAULT_POMODORO_SHORT_BREAK,
  longBreakLength: DEFAULT_POMODORO_LONG_BREAK,
  timeLeft: DEFAULT_POMODORO_LENGTH,
  status: "stopped",
  intervalCount: 0
};

export const FORBIDDEN_CHARACTERS = ["<", ">", "(", ")"];

export default {
  DEFAULT_TASKS,
  DEFAULT_POMODORO,
  FORBIDDEN_CHARACTERS,
  DEFAULT_POMODORO_LENGTH,
  DEFAULT_POMODORO_SHORT_BREAK,
  DEFAULT_POMODORO_LONG_BREAK
};
