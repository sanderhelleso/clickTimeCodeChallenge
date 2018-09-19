import React, { Component } from 'react';
import 'animate.css';
import * as Icon from 'react-feather';

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

        // bind class specific functions
        this.startStopwatch = this.startStopwatch.bind(this);
        this.stopStopwatch = this.stopStopwatch.bind(this);
        this.getTime = this.getTime.bind(this);
        this.renderHistoryRow = this.renderHistoryRow.bind(this);
        this.updateLocalStorage =  this.updateLocalStorage.bind(this);
        this.clearHistory = this.clearHistory.bind(this);
    }

    // render main history table
    renderTable() {
        const TABLE =
        <div id='history-table'>
            <Icon.Trash2 id='clear-history' color='#ef3f61' onClick={this.clearHistory} />
            <h2 id='history-heading'>History</h2>
            <div id='history-rows'>
                {this.renderHistoryRow()}
            </div>
            <p id='history-intro'>Professor Higginbotham has challenged you to a race around the world in a steam-powered zeppelin of your own invention. In order to verify your time at each leg of the race, you will need to create a stopwatch web application consisting of a start/stop button and a history table. Each time you start the stopwatch, the application inserts a new row into the history table that records the start time, and the current latitude and longitude. When you stop the stopwatch, the application will record the time, latitude, and longitude, as well as the amount of time that has elapsed.</p>
        </div>

        return TABLE;
    }

    // render main stopwatch container
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

    // render button depending on state (start, pending, stop)
    renderStartStop() {
        if (!this.state.started) {
            return <button id='start-stop-btn' className='start-btn animated flipInX' onClick={this.startStopwatch}>Start</button>
        }

        else if (this.state.started === 'pending') {
            return <button id='start-stop-btn' className='stop-btn disabled' disabled>Hang on..</button>
        }

        else {
            return <button id='start-stop-btn' className='stop-btn animated flipInX' onClick={this.stopStopwatch}>Stop</button>
        }
    }

    // render a history row for each entry
    renderHistoryRow() {

        // check for local storage, if true we use the localstorage to update app
        let getValues;
        if (localStorage.getItem('historyTable') === null) {
            getValues = this.state.historyRows;
        }

        // if not, use the current app state
        else {
            getValues = JSON.parse(localStorage.getItem('historyTable'));
        }

        return getValues.map((row) => {
            return <div key={row.rowID} className='history-row animated fadeIn'>
                        <div className='row-id-container'>
                            <h4 className='row-id'><Icon.Hash color='#332e4b' /><span>{row.rowID}</span></h4>
                        </div>
                        <div>
                            <h4>Start</h4>
                            <h5><Icon.Calendar className='row-ico'/>{row.startTime}</h5>
                            <h5><Icon.MapPin className='row-ico'/>{row.coords.start.lat}, {row.coords.start.lng}</h5>
                        </div>
                        <div>
                            <h4>End</h4>
                            <h5><Icon.Calendar className='row-ico'/>{row.endTime}</h5>
                            <h5><Icon.MapPin className='row-ico'/>{row.coords.end.lat}, {row.coords.end.lng}</h5>
                        </div>
                        <div className='history-row-time-info'>
                            <h3>Time Elapsed</h3>
                            <h2>{row.hours}<span>h</span> {row.mins}<span>m</span> {row.secs}<span>s</span></h2>
                        </div>
                    </div>
        });
    }

    // start stopwatch
    async startStopwatch() {
        this.setState({
            started: 'pending'
        });

        // wait for coords
        const crds = await this.getLocation(); 

        // update state
        this.setState({
            started: true,
            startTime: this.getTimestamp(),
            historyRowsCount: this.state.historyRows.length + 1,
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

    // stop stopwatch
    async stopStopwatch() {

        this.setState({
            started: 'pending'
        });

        // stop interval
        clearInterval(this.intervalID);
        const crds = await this.getLocation(); 
        
        // update state and add new row entry to array of history entries
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
        }, () => {this.updateLocalStorage()}); // update localstorage after setting new state        
    }

    // update localstorage and rerender 
    updateLocalStorage() {
        localStorage.setItem('historyTable', JSON.stringify(this.state.historyRows));
        this.setState({
            historyRows: this.state.historyRows
        });
    }

    // clear localstorage and history entries
    clearHistory() {
        localStorage.removeItem('historyTable');
        this.setState({
            historyRows: []
        });
    }

    // get s, m, h from ms
    getTime(ms) {
        const seconds = parseInt((ms / 1000) % 60);
        const minutes = parseInt((ms / (1000 * 60)) % 60);
        const hours = parseInt((ms / (1000 * 60 * 60)) % 24);

        // update timer state
        this.setState({
            currentTimer: {
                secs: seconds,
                mins: minutes,
                hours: hours,
                ms: ms + 1000
            }
        });      
    }

    // get time and date stopwatch was started/stopped
    getTimestamp() {
        const today = new Date();
        const date =  `${addZero((today.getMonth() + 1))} ${addZero(today.getDate())} ${today.getFullYear()}`;
        const time = `${addZero(today.getHours())} : ${addZero(today.getMinutes())}`;
        return `${date} ${time}`;

        // function to add zero infront of input if less than 10
        function addZero(value) {
            if (value < 10) {
                value = `0${value}`;
            }
            return value;
        }
    }

    // async method to get current location
    getLocation() {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        });
    }

    // render app
    render() {
        return (
            <div className='grid-container'>
                {this.renderTable()}
                {this.renderWatch()}
            </div>
        )
    }
}
