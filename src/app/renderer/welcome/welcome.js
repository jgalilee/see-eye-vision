const {ipcRenderer} = require('electron');
const {withMaterialDesign} = require('../../../common');
const Renderer = require('../Renderer');

const widget = new Renderer('welcome', ipcRenderer, withMaterialDesign);

widget.on('ready', () => widget.on('addresses', (event, {port, address}) => {
    document.getElementById('address').textContent = `${address}:${port}`;
}));
