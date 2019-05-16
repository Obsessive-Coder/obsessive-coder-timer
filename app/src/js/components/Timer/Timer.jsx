import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  startTimer,
  stopTimer,
  countTimer,
  toggleTimerIsCounting
} from "../../actions";

const mapStateToProps = state => ({ timer: state.timer });
const mapDispatchToProps = dispatch => ({
  startTimer: timer => dispatch(startTimer(timer)),
  stopTimer: () => dispatch(stopTimer()),
  countTimer: () => dispatch(countTimer()),
  toggleTimerIsCounting: () => dispatch(toggleTimerIsCounting())
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

  startTimerInterval() {
    this.props.startTimer({ timeLeft: 10 });
    this.timer = setInterval(() => {
      if (this.props.timer.isCounting) {
        this.props.countTimer();
      }

      if (this.props.timer.timeLeft < 1) {
        this.handleStopClick();
      }
    }, 1000);
  }

  handlePlayClick() {
    this.props.toggleTimerIsCounting();
    if(this.props.timer.timeLeft <= 0) {
      this.startTimerInterval();
    }
  }

  handleStopClick() {
    if(this.timer) {
      clearInterval(this.timer);
    }
    this.props.stopTimer();
  }

  componentDidMount() {
    this.startTimerInterval();
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
            <span>{timerMinutes}</span>
            &nbsp;:&nbsp;
            <span>{timerSeconds}</span>
          </p>

          <div className="d-flex px-4">
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
