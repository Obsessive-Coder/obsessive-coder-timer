export const DEFAULT_TASKS = [{
  id: 'b10823dd-2528-4408-8db6-b10e48b61889',
  description: 'Learn Redux',
  isComplete: false
}, {
  id: 'dc3f25e5-ba95-4098-b49c-6e0c84484999',
  description: 'Make a Redux app',
  isComplete: false
}];

export const DEFAULT_TIMER = {
  timeLeft: 0,
  isCounting: false,
  intervalCount: 0
};

export const FORBIDDEN_CHARACTERS = ['<', '>', '(', ')'];

export default {
  DEFAULT_TASKS,
  DEFAULT_TIMER,
  FORBIDDEN_CHARACTERS
};