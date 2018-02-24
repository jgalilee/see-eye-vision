const path = require('path');
const {app, BrowserWindow, ipcMain} = require('electron');
const {getLocalAddresses} = require('../common');
const {Server} = require('../server');
const {Main} = require('./main');
const config = require('./config');

let win;
let view;
let welcome;
let server;

app.on('ready', () => {
    win = new BrowserWindow(config);

    win.setMenuBarVisibility(false);

    win.once('ready-to-show', () => win.show());

    win.on('closed', () => win = null);

    welcome = new Main('welcome', win, config.debug);

    view = new Main('qrcode', null, config.debug);

    view.setParentWindow(win);

    server = new Server(path.join(__dirname, '../../dist', 'client'));

    server.on('change', ({url}) => win.loadURL(url));

    server.on('reset', () => welcome.resetURL());

    server.on('start', (port) => {
        const [address] = getLocalAddresses(port);
        ipcMain.on('ready', () => {
            console.log('main: ipcMain ready');
            welcome.send('addresses', {port, address});
            view.send('url-change', `http://${address}:${port}/`);
        });
        console.log(`main: server listening on: ${address}:${port}`);
    });

    server.start(9090);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        server.close();
        app.quit();
    }
});
