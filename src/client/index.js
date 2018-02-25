import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('app'), () => {
    window.socket = io(window.location.origin);
    window.mdc = require('material-components-web/dist/material-components-web.js');
    mdc.autoInit();
});
