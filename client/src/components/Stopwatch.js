import React, { Component } from 'react';

export default class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTimer: {
                hours: 0,
                mins: 0,
                secs: 0,
                ms: 1000, // start at 1000 sec due to 1000 ms initial delay of interval
                startTime: null
            },
            historyRows: [],
            historyRowsCount: 0,
            started: false
        };

        this.startStopwatch = this.startStopwatch.bind(this);
        this.stopStopwatch = this.stopStopwatch.bind(this);
        this.getTime = this.getTime.bind(this);
        this.renderHistoryRow = this.renderHistoryRow.bind(this);
    }

    renderTable() {
        const TABLE =
        <div id='history-table'>
            <h2 id='history-heading'>History</h2>
            <div id='history-rows'>
                {this.renderHistoryRow()}
            </div>
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

        else if (this.state.started === 'pending') {
            return <button id='start-stop-btn' className='stop-btn disabled' disabled>Hang on..</button>
        }

        else {
            return <button id='start-stop-btn' className='stop-btn' onClick={this.stopStopwatch}>Stop</button>
        }
    }

    renderHistoryRow() {
        return this.state.historyRows.map((row) => {
            console.log(row);
            return <div key={row.rowID} className='history-row'>
                        <div className='row-id-container'>
                            <h4 className='row-id'>{row.rowID}</h4>
                        </div>
                        <div>
                            <h4>Start</h4>
                            <h5>{row.startTime}</h5>
                            <h5>{row.coords.start.lat}, {row.coords.start.lng}</h5>
                        </div>
                        <div>
                            <h4>End</h4>
                            <h5>{row.endTime}</h5>
                            <h5>{row.coords.end.lat}, {row.coords.end.lng}</h5>
                        </div>
                        <div className='history-row-time-info'>
                            <h3>Time Elapsed</h3>
                            <h2>{row.hours}<span>h</span> {row.mins}<span>m</span> {row.secs}<span>s</span></h2>
                        </div>
                    </div>
        });
    }

    async startStopwatch() {

        this.setState({
            started: 'pending'
        });

        const crds = await this.getLocation();  // wait for getPosition to complete
        console.log(crds);

        // change state of button
        this.setState({
            started: true,
            startTime: this.getTimestamp(),
            historyRowsCount: this.state.historyRowsCount + 1,
            startCords: {
                lat: crds.coords.latitude,
                lng: crds.coords.longitude
            }
        });

        // set interval to update state every sec
        this.intervalID = setInterval(() => {
            this.getTime(this.state.currentTimer.ms)
        }, 1000);


    }

    async stopStopwatch() {

        this.setState({
            started: 'pending'
        });

        // stop interval
        clearInterval(this.intervalID);
        const crds = await this.getLocation();  // wait for getPosition to complete

            this.setState({
                started: false,
                historyRows: [...this.state.historyRows,
                    {   rowID: this.state.historyRowsCount,
                        hours: this.state.currentTimer.hours,
                        mins: this.state.currentTimer.mins,
                        secs: this.state.currentTimer.secs,
                        startTime: this.state.startTime,
                        endTime: this.getTimestamp(),
                        coords: {
                            start: this.state.startCords,
                            end: {
                                lat: crds.coords.latitude,
                                lng: crds.coords.longitude
                            }
                        }
                    }
                ],
                currentTimer: {
                    hours: 0,
                    mins: 0,
                    secs: 0,
                    ms: 1000
                }
            });

            console.log(this.state);
    }

    getTime(ms) {
        const seconds = parseInt((ms / 1000) % 60);
        const minutes = parseInt((ms / (1000 * 60)) % 60);
        const hours = parseInt((ms / (1000 * 60 * 60)) % 24);

        this.setState({
            currentTimer: {
                secs: seconds,
                mins: minutes,
                hours: hours,
                ms: ms + 1000
            }
        });      
    }

    getTimestamp() {
        const today = new Date();
        const date =  (today.getMonth() + 1) + '.' + today.getDate() + '.' +  today.getFullYear();
        const time = today.getHours() + ":" + today.getMinutes();
        return date + ' ' + time;
    }

    getLocation() {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
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
