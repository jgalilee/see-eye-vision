require('babel-register');

const {ipcRenderer} = require('electron');
const {default: Renderer} = require('../Renderer');
const {withMaterialDesign} = require('../../../common');

const widget = new Renderer('welcome', ipcRenderer, withMaterialDesign);

widget.on('ready', () => widget.on('addresses', (event, {port, address}) => {
    document.getElementById('address').textContent = `${address}:${port}`;
}));
