import React, { Component } from 'react';

export default class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTimer: {
                hours: '00',
                mins: '00',
                secs: '00'
            }
        };
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
            <h2 id='timer' className='long-shadow'>{this.state.currentTimer.mins}<span>:</span>{this.state.currentTimer.secs}</h2>
            {this.renderStartStop()}
        </div>

        return WATCH;
    }

    renderStartStop() {
        return <button id='start-stop-btn' className='start-btn'>Start</button>
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
