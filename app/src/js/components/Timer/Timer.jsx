import React, { Component } from "react";
import { connect } from "react-redux";

import { PomodoroCount, TimerButton, TimerDisplay } from "./sub-components";

import ACTIONS from "../../actions";

import { CONSTANTS } from "../../constants";

const mapStateToProps = state => ({ timer: state.timer });
const mapDispatchToProps = dispatch => ({
  startTimer: () => dispatch(ACTIONS.START_TIMER()),
  stopTimer: () => dispatch(ACTIONS.STOP_TIMER()),
  countTimer: () => dispatch(ACTIONS.COUNT_TIMER()),
  toggleTimerIsCounting: () => dispatch(ACTIONS.TOGGLE_TIMER_IS_COUNTING()),
  incrementIntervalCount: () => dispatch(ACTIONS.INCREMENT_INTERVAL_COUNT()),
  resetTimer: () => dispatch(ACTIONS.RESET_TIMER())
});

class ConnectedTimer extends Component {
  constructor() {
    super();

    this.state = {
      isStopped: false
    };

    this.timer = undefined;

    // Bind class methods.
    this.startTimerInterval = this.startTimerInterval.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
  }

  startTimerInterval() {
    this.setState(
      () => ({ isStopped: false }),
      () => {
        if (this.props.timer.timeLeft < 1) {
          this.props.startTimer();
        }

        this.timer = setInterval(() => {
          if (this.state.isStopped) return;

          this.props.countTimer();

          // Stop the interval if the timer is out of time.
          if (this.props.timer.timeLeft <= 0) {
            this.handleStopClick();
            this.startTimerInterval();
          }
        }, 1000);
      }
    );
  }

  handlePlayClick() {
    if(!this.state.isStopped) return;
    this.startTimerInterval();
  }

  handleStopClick() {
    clearInterval(this.timer);
    this.setState(state => ({ isStopped: true }));
  }

  componentDidMount() {
    this.startTimerInterval();
  }

  render() {
    const { timer } = this.props;

    return (
      <div className="d-flex">
        <div className="mx-auto text-center">
          <TimerDisplay timeLeft={timer.timeLeft} />

          <div className="d-flex w-50 mx-auto">
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

          <p className="mt-5 timer-status">
            {timer.status === "work" ? "Working" : "Taking a Break"}
          </p>
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
