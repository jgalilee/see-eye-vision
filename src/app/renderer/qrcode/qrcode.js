require('babel-register');

const {ipcRenderer} = require('electron');
const {default: Renderer} = require('../Renderer');
const {default: QRCode} = require('./lib/QRCode');

const widget = new Renderer('qrcode', ipcRenderer);

widget.on('ready', () => {
    widget.log('ready');
    const qrcode = new QRCode('content', {width: 128, height: 128});
    widget.on('url-change', (event, url) => {
        widget.log('url');
        qrcode.makeCode(url);
    });
});
