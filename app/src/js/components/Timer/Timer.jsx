import React, { Component } from "react";
import { connect } from "react-redux";

import { PomodoroCount, TimerButton, TimerDisplay } from './sub-components';

import ACTIONS from '../../actions';

import {
  DEFAULT_TIMER,
  DEFAULT_TIMER_LENGTH,
  DEFAULT_TIMER_SHORT_BREAK,
  DEFAULT_TIMER_LONG_BREAK
} from "../../constants/constants";

const mapStateToProps = state => ({ timer: state.timer });
const mapDispatchToProps = dispatch => ({
  startTimer: timer => dispatch(ACTIONS.START_TIMER(timer)),
  stopTimer: () => dispatch(ACTIONS.STOP_TIMER()),
  countTimer: () => dispatch(ACTIONS.COUNT_TIMER()),
  toggleTimerIsCounting: () => dispatch(ACTIONS.TOGGLE_TIMER_IS_COUNTING()),
  incrementIntervalCount: () => dispatch(ACTIONS.INCREMENT_INTERVAL_COUNT()),
  resetTimer: () => dispatch(ACTIONS.RESET_TIMER())
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
        } else {
          this.props.resetTimer();
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

    return (
      <div className="d-flex">
        <div className="mx-auto text-center">
          <TimerDisplay timeLeft={timer.timeLeft} />

          <div className="d-flex">
            <TimerButton
              color="info"
              iconClass={timer.isCounting ? "fa-pause" : "fa-play"}
              className="flex-fill"
              handleOnClick={this.handlePlayClick}
            />
            <TimerButton
              color="danger"
              iconClass="fa-stop"
              handleOnClick={this.handleStopClick}
            />
          </div>
        </div>

        <PomodoroCount intervalCount={timer.intervalCount} />
      </div>
    );
  }
}

const Timer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedTimer);

export default Timer;
