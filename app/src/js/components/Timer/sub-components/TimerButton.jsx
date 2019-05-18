import React from "react";

export default function TimerButton(props) {
  const { handleOnClick, color, iconClass, className } = props;
  return (
    <button
      onClick={handleOnClick}
      className={`btn rounded-0 btn-outline-${color} ${className}`}
    >
      <i className={`fas ${iconClass}`} />
    </button>
  );
}
