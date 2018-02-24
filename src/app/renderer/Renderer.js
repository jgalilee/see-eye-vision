/** @module app/Renderer */
const {onDocumentReady} = require('../../common');

/**
 * Wrapper around the Renderer IPC. It primarily acts as a buffer to messages
 * sent from the IPC before the Main IPC is ready.
 */
class Renderer {
    /**
     * Creates the wrapper and when the document is ready sends any messages
     * that were sent / received before the document was ready.
     * @param {String} id - Identifier for the renderer IPC messages.
     * @param {*} renderer - Renderer IPC object.
     * @param {Function} onReady - Callback to mark the renderer as ready,
     * defaults to onDocumentReady.
     */
    constructor(id, renderer, onReady = onDocumentReady) {
        this.id = id;
        this.renderer = renderer;
        this.ready = false;
        this.buffer = [];
        this.callback = null;
        onReady(() => {
            this.ready = true;
            this.flush();
        });
    }

    /**
     * Helper method appending the current ID of the wrapper to log messages.
     * @param {*} args - Arguments to print into the log method.
     */
    log(...args) {
        console.log(...[`${this.id}:`, ...args]);
    }

    /**
     * Listen for messages in the same way as the IPC Renderer, but listeners
     * will be buffered until the document is ready. Buffered listeners are only
     * set after flush is called.
     * @param {*} event - Name of the event to listen for.
     * @param {function} callback - Callback for the event.
     */
    on(event, callback) {
        if (event === 'ready') {
            if (this.ready === true) {
                this.callback();
            }
            this.callback = () => {
                this.renderer.send('ready', this.id);
                callback(this);
            };
            return;
        }
        if (!this.ready) {
            this.buffer.push({type: 'on', event, data: callback});
            return;
        }
        this.renderer.on(event, callback);
    }

    /**
     * Sends a message in the same way as the IPC Renderer, but the message will
     * be buffered until the document is ready. Buffered messages are only
     * resolved by flush.
     * @param {*} event - Name of the event.
     * @param {*} data - Data associated with the event.
     */
    send(event, data) {
        if (!this.ready) {
            this.buffer.push({type: 'send', event, data});
            return;
        }
        this.renderer.send(event, data);
    }

    /**
     * Send and respond to any buffered messages. It should only be called when
     * the document is ready.
     */
    flush() {
        if (this.callback !== null && this.callback !== undefined) {
            this.callback();
        }
        while (this.buffer.length > 0) {
            const {type, event, data} = this.buffer.pop();
            switch (type) {
                case 'on':
                    this.renderer.on(event, data);
                    break;
                case 'send':
                    this.renderer.send(event, data);
                    break;
                default:
                    throw new Error(`unknown buffer type: ${type}`);
            }
        }
    }
}

module.exports = Renderer;
