import path from 'path';
import {app, BrowserWindow, ipcMain} from 'electron';
import {getLocalAddresses} from '../common';
import {Server} from '../server';
import {Main} from './main';
import config from './config';
import robot from 'robotjs';

let win;
let code;
let welcome;
let server;

const debug = (...args) => {
    if (config.env === 'debug') {
        console.log.apply(null, args);
    }
};

app.on('ready', () => {
    win = new BrowserWindow(config);

    win.setMenuBarVisibility(false);

    win.once('ready-to-show', () => win.show());

    win.on('closed', () => win = null);

    welcome = new Main('welcome', win, config.debug);

    code = new Main('code', null, config.debug);

    code.setParentWindow(win);

    server = new Server(path.join(__dirname, '../../dist', 'client'));

    server.on('change', ({url}) => win.loadURL(url));

    server.on('reset', () => welcome.resetURL());

    server.on('keypress', ({key, code}) => {
        if (!code.startsWith('Key') && !code.startsWith('Digit')) {
            try {
                robot.keyTap(code.toLowerCase());
                return;
            } catch (ex) {
                debug('not a special key: ', key, 'defaulting to typing');
            }
        }
        robot.typeString(key);
    });

    const {width: displayWidth, height: displayHeight} = robot.getScreenSize();
    debug(`display: ${displayWidth}x${displayHeight}`);

    let startX = null;
    let startY = null;
    let downX = null;
    let downY = null;

    server.on('mouseup', () => {
        const {x, y} = robot.getMousePos();
        robot.mouseToggle('up', 'left');
        robot.mouseToggle('up', 'right');
        startX = x;
        startY = y;
        downX = null;
        downY = null;
        debug({
            startX,
            startY,
        });
    });

    server.on('mousemove', (data) => {
        const {clientX, screenWidth, clientY, screenHeight} = data;
        const scale = (num, max, originalMax) => max * num / originalMax;
        const clientXScaled = scale(clientX, displayWidth, screenWidth);
        const clientYScaled = scale(clientY, displayWidth, screenHeight);
        if (downX === null) {
            downX = clientXScaled;
        }
        if (downY === null) {
            downY = clientYScaled;
        }
        const adjustedX = startX + (clientXScaled - downX);
        const adjustedY = startY + (clientYScaled - downY);
        robot.moveMouse(adjustedX, adjustedY);
        debug(Object.assign({}, data, {
            clientXScaled,
            clientYScaled,
            downX,
            downY,
            adjustedX,
            adjustedY,
        }));
    });

    server.on('mouseclick', ({button}) => {
        if (['left', 'right'].includes(button)) {
            debug('mouseclick', button);
            robot.mouseClick(button);
        } else {
            debug('mouseclick: unknown button:', button);
        }
    });

    server.on('start', (port) => {
        const [address] = getLocalAddresses(port);
        ipcMain.on('ready', () => {
            console.log('main: ipcMain ready');
            welcome.send('server:address', {port, address});
            code.send('server:code', `http://${address}:${port}/`);
        });
        debug(`main: server listening on: ${address}:${port}`);
    });

    server.start(config.port);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        server.close();
        app.quit();
    }
});
