import React from "react";

export default function PomodoroCount(props) {
  const { intervalCount } = props;
  return (
    <p className="font-xl">
      Pomodoros:&nbsp;
      <span>{intervalCount}</span>
    </p>
  );
}
