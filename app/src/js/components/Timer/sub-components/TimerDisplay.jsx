import React from "react";

export default function(props) {
  const { timeLeft } = props;
  const timerMinutes = Math.floor(timeLeft / 60).toString();
  const timerSeconds = Math.floor(timeLeft % 60)
    .toString()
    .padStart(2, 0);

  return (
    <p className="mb-0 font-largest">
      <span>{timerMinutes}</span>:<span>{timerSeconds}</span>
    </p>
  );
}
