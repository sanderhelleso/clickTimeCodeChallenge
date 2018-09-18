import React, { Component } from 'react';

export default class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTimer: {
                hours: 0,
                mins: 0,
                secs: 0
            },
            started: false
        };

        this.startStopwatch = this.startStopwatch.bind(this);
        this.stopStopwatch = this.stopStopwatch.bind(this);
    }

    renderTable() {
        const TABLE =
        <div id='history-table'>
            <h2 id='history-heading'>History</h2>
            <p id='history-intro'>Professor Higginbotham has challenged you to a race around the world in a steam-powered zeppelin of your own invention. In order to verify your time at each leg of the race, you will need to create a stopwatch web application consisting of a start/stop button and a history table. Each time you start the stopwatch, the application inserts a new row into the history table that records the start time, and the current latitude and longitude. When you stop the stopwatch, the application will record the time, latitude, and longitude, as well as the amount of time that has elapsed.</p>
        </div>

        return TABLE;
    }

    renderWatch() {
        const WATCH =
        <div id='stopwatch'>
            <div id='timer-container'>
                <div id='timer' className='long-shadow'>
                    <h5 id='hours'>{this.state.currentTimer.hours}<span>h</span></h5>
                    <h5 id='mins'>{this.state.currentTimer.mins}<span>m</span></h5>
                    <h2 id='secs'>{this.state.currentTimer.secs}<span>s</span></h2>
                </div>
            </div>
            {this.renderStartStop()}
        </div>

        return WATCH;
    }

    renderStartStop() {
        if (!this.state.started) {
            return <button id='start-stop-btn' className='start-btn' onClick={this.startStopwatch}>Start</button>
        }

        else {
            return <button id='start-stop-btn' className='stop-btn' onClick={this.stopStopwatch}>Stop</button>
        }
    }

    startStopwatch() {
        this.setState({
            started: true
        });
    }

    stopStopwatch() {
        this.setState({
            started: false
        });
    }

    render() {
        return (
            <div className='grid-container'>
                {this.renderTable()}
                {this.renderWatch()}
            </div>
        )
    }
}
