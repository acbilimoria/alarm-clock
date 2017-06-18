import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Time extends React.Component {
  render() {
    return (
      <div>
        <h2>Current Time: {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      alarmTime: "",
    };
    this.handleAlarmFormChange = this.handleAlarmFormChange.bind(this);
    this.handleSetAlarm = this.handleSetAlarm.bind(this);
    this.handleTriggerAlarm = this.handleTriggerAlarm.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  handleAlarmFormChange(event) {
    this.setState({alarmTime: event.target.value});
  }

  handleSetAlarm(event) {
    if (this.state.alarmTime != "")
    {
      alert('Your alarm is set for: ' + this.state.alarmTime);
    }
    else
    {
      alert("Great job testing this out!  Why don't you set the alarm and try out the real thing?");
    }
    event.preventDefault();
  }

  handleTriggerAlarm(event) {
    if (this.state.alarmTime != "")
    {
      alert("Alarm!  It is " + this.state.alarmTime);
    }
    else
    {
      alert("Great job testing this out!  Why don't you set the alarm and try out the real thing?");
    }
    this.setState({alarmTime: ""});
  }

  render() {
    var currentTime = this.state.date.toLocaleTimeString();
    var alarmTime = this.state.alarmTime.replace(":", "");
    var currentSplitTime = currentTime.split(":");
    var currentMinute = currentSplitTime[1];
    if (currentTime.indexOf("PM") !== -1)
    {
      var currentHour = (parseInt(currentSplitTime[0]) + 12).toString();
      var currentMilitaryTime = parseInt(currentHour + currentMinute);
    }
    else
    {
      var currentHour = (parseInt(currentSplitTime[0])).toString();
      var currentMilitaryTime = parseInt(currentHour + currentMinute);
    }

    if (currentMilitaryTime == alarmTime)
    {
      {this.handleTriggerAlarm()};
    }


    return (
      <div>
        <h1>Alarm Clock!</h1>
        <Time date={this.state.date} />

        <form
          onSubmit={this.handleSetAlarm}>
          <label>
            Alarm Time:
          </label>
          <br />
          <input
            type="time"
            value={this.state.alarmTime}
            onChange={this.handleAlarmFormChange} />
          <br />
          <br />
          <input
            type="submit"
            value="Save Your Alarm" />
        </form>
        <br />
        <input
          type="submit"
          value="Test Alarm"
          onClick={this.handleTriggerAlarm} />
      </div>
    );
  }
}

export default App;
