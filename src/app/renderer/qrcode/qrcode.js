const {ipcRenderer} = require('electron');
const Renderer = require('../Renderer');
const QRCode = require('./lib/QRCode');

const widget = new Renderer('qrcode', ipcRenderer);

widget.on('ready', () => {
    widget.log('ready');
    const qrcode = new QRCode('content', {width: 128, height: 128});
    widget.on('url-change', (event, url) => {
        widget.log('url');
        qrcode.makeCode(url);
    });
});
