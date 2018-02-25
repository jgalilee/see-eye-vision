import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome';
import Code from './components/Code';

const Widget = (props) => {
    const widget = window.location.hash;
    switch (widget) {
        case '#welcome':
            return <Welcome {...props} />;
        case '#code':
            return <Code {...props} />;
        default:
            throw new Error(`unknown widget: ${widget}`);
    }
};

// -----------------------------------------------------------------------------

// const {ipcRenderer} = require('electron');
// const {withMaterialDesign} = require('../../../common');
// const Renderer = require('../Renderer');

// const widget = new Renderer('welcome', ipcRenderer, withMaterialDesign);

// widget.on('ready', () => widget.on('addresses', (event, {port, address}) => {
//     document.getElementById('address').textContent = `${address}:${port}`;
// }));

// -----------------------------------------------------------------------------

// const {ipcRenderer} = require('electron');
// const Renderer = require('../Renderer');
// const QRCode = require('./lib/QRCode');

// const widget = new Renderer('qrcode', ipcRenderer);

// widget.on('ready', () => {
//     widget.log('ready');
//     const qrcode = new QRCode('content', {width: 128, height: 128});
//     widget.on('url-change', (event, url) => {
//         widget.log('url');
//         qrcode.makeCode(url);
//     });
// });

ReactDOM.render(<Widget />, document.getElementById('app'));
