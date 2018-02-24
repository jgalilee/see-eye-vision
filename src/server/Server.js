/** @module server/Server */

const http = require('http');
const express = require('express');
const socket = require('socket.io');

/** Server is a wrapper class around an express server and socket.io */
export default class Server {
    /**
     * Creates a new wrapper for managing an express server and socket.io
     * binding.
     * @constructor
     * @param {*} path - Path for the folder to serve static files from.
     */
    constructor(path) {
        this.path = path;
        this.app = express();
        /* eslint-disable new-cap */
        this.server = http.Server(this.app);
        this.io = socket(this.server);
        this.events = {};
        this.port = null;
        this.callback = () => {};
    }

    /**
     * Registers the callback for the given event.  All events must have been
     * registered before the server is started. Registering a callback for the
     * start event is only called after the server is started, not for start
     * events recieved by socket.io.
     * @param {*} event - Name of the event to register the callback against.
     * @param {*} callback - Callback if the event is triggered.
     */
    on(event, callback) {
        if (event === 'start') {
            this.callback = callback;
            if (this.port !== null) {
                callback(this.port);
                return;
            }
        }
        this.events[event] = callback;
    }

    /**
     * Returns the callback registered with the given event.
     * @param {*} event - Name of the event to retrieve the callback.
     * @return {function} callback - Function wrapping callback with logging.
     */
    for(event) {
        return (data) => {
            console.log(`on: ${event}: ${JSON.stringify(data)}`);
            const callback = this.events[event];
            callback(data);
        };
    }

    /**
     * Starts the server listening on the provided port. If a listener is
     * defined for the start event, it will be called.
     * @param {Number} port - Port to bind the express server to.
     */
    start(port) {
        console.log('server: ', this.path);
        this.app.use(express.static(this.path));
        this.io.on('connection', (socket) => {
            Object.keys(this.events).forEach((event) => {
                socket.on(event, this.for(event));
            });
        });
        this.server.listen(port, null, null, () => {
            this.port = port;
            this.callback(port);
        });
    }

    /** Closes the express server if it is defined. */
    close() {
        if (this.server !== null && this.server !== undefined) {
            this.server.close();
        }
    }
}
