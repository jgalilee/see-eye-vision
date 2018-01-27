/** @module app/Main */

import url from 'url';
import path from 'path';
import {BrowserView} from 'electron';

/** Wrapper around the Main view. */
export default class Main {
    /**
     * Creates a new BrowserView with node integration, if none is provided.
     * If debug is set to true developer tools will be enabled on the view.
     * The BrowserView is set to display the HTML file infered from the ID.
     * @constructor
     * @param {string} id - Identifier for the view.
     * @param {BrowserView} view - BrowserView to wrap.
     * @param {boolean} debug - Mark if developer tools are enabled on the view.
     */
    constructor(id, view, debug) {
        this.id = id;
        this.view = view;
        if (this.view === null || this.view === undefined) {
            this.view = new BrowserView({
                webPreferences: {
                    nodeIntegration: true,
                },
            });
        }
        this.resetURL();
        if (debug) {
            this.view.webContents.toggleDevTools();
        }
    }

    /**
     * Get the id of the main wrapper.
     * @return {string} Id of the Main wrapper.
     */
    getId() {
        return this.id;
    }

    /** Reset the wrapped view to display the original URL based on the id. */
    resetURL() {
        const id = this.getId();
        const idFile = `${this.getId()}.html`;
        this.view.webContents.loadURL(url.format({
            pathname: path.join(__dirname, '../renderer', id, idFile),
            protocol: 'file:',
            slashes: true,
        }));
    }

    /**
     * Set the parent window for the wrapper view.
     * @param {BrowserWindow} parent - BrowserWindow to set the wrapped view on.
     */
    setParentWindow(parent) {
        if (this.parent !== undefined) {
            throw new Error(`${this.getId()}: parent already set`);
        }
        this.parent = parent;
        this.parent.setBrowserView(this.view);
        this.parent.on('resize', () => this.updateBounds());
        this.updateBounds();
    }

    /** Sets the bounds of the view relative to the parent. */
    updateBounds() {
        const {width, height} = this.parent.getBounds();
        const size = 180;
        const padding = size * 0.1;
        this.view.setBounds({
            x: width - size - padding,
            y: height - size - padding,
            width: size,
            height: size,
        });
    }

    /**
     * Send proxies to the wrapped view webContent.
     * @param {*} args - Arguments to send to the proxy.
     */
    send(...args) {
        this.view.webContents.send(...args);
    }
}
