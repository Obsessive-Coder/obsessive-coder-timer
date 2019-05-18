import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  startTimer,
  stopTimer,
  countTimer,
  toggleTimerIsCounting,
  incrementIntervalCount
} from "../../actions";

import {
  DEFAULT_TIMER,
  DEFAULT_TIMER_LENGTH,
  DEFAULT_TIMER_SHORT_BREAK,
  DEFAULT_TIMER_LONG_BREAK
} from "../../constants/constants";

const mapStateToProps = state => ({ timer: state.timer });
const mapDispatchToProps = dispatch => ({
  startTimer: timer => dispatch(startTimer(timer)),
  stopTimer: () => dispatch(stopTimer()),
  countTimer: () => dispatch(countTimer()),
  toggleTimerIsCounting: () => dispatch(toggleTimerIsCounting()),
  incrementIntervalCount: () => dispatch(incrementIntervalCount())
});

class ConnectedTimer extends Component {
  constructor() {
    super();

    this.timer = undefined;

    // Bind class methods.
    this.startTimerInterval = this.startTimerInterval.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
  }

  startTimerInterval(timer) {
    this.props.startTimer(timer);

    this.timer = setInterval(() => {
      if (this.props.timer.isCounting) {
        this.props.countTimer();
      }

      if (this.props.timer.timeLeft <= 0) {
        this.handleStopClick();

        let { phase: timerPhase, intervalCount } = this.props.timer;
        let timerLength = DEFAULT_TIMER_LENGTH / 60;

        if (timerPhase === "pomodoro") {
          timerPhase = "break";
          intervalCount += 1;
          if (intervalCount < 4) {
            timerLength = DEFAULT_TIMER_SHORT_BREAK / 60;
          } else {
            timerLength = DEFAULT_TIMER_LONG_BREAK / 60;
          }
        } else {
          timerPhase = "pomodoro";
        }

        const newTimer = DEFAULT_TIMER;
        newTimer.timeLeft = timerLength;
        newTimer.intervalCount = intervalCount;
        newTimer.phase = timerPhase;

        if(intervalCount < 4 || (intervalCount === 4 && timerPhase === 'break')) {
        this.startTimerInterval(newTimer);
        }
      }
    }, 1000);
  }

  handlePlayClick() {
    this.props.toggleTimerIsCounting();
    if (this.props.timer.timeLeft <= 0) {
      this.startTimerInterval(DEFAULT_TIMER);
    }
  }

  handleStopClick() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.props.stopTimer();
  }

  componentDidMount() {
    this.startTimerInterval(DEFAULT_TIMER);
  }

  render() {
    const { timer } = this.props;
    const timerMinutes = Math.floor(timer.timeLeft / 60).toString();
    const timerSeconds = Math.floor(timer.timeLeft % 60)
      .toString()
      .padStart(2, 0);

    return (
      <div className="d-flex">
        <div className="mx-auto text-center">
          <p className="mb-0 font-largest">
            <span>{timerMinutes}</span>:<span>{timerSeconds}</span>
          </p>

          <div className="d-flex">
            <button
              onClick={this.handlePlayClick}
              className="flex-fill btn btn-outline-info rounded-0"
            >
              <i
                className={`fas ${timer.isCounting ? "fa-pause" : "fa-play"}`}
              />
            </button>
            <button
              onClick={this.handleStopClick}
              className="btn btn-outline-danger rounded-0"
            >
              <i className="fas fa-stop" />
            </button>
          </div>
        </div>

        <p className="font-xl">
          Pomodoros:&nbsp;
          <span>{timer.intervalCount}</span>
        </p>
      </div>
    );
  }
}

const Timer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedTimer);

export default Timer;
