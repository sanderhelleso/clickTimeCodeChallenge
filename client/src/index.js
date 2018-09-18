import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Stopwatch from './components/Stopwatch';

ReactDOM.render(
    <Stopwatch />,
     document.getElementById('root')
);

registerServiceWorker();
