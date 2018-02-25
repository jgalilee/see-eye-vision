 /* eslint-disable max-len, require-jsdoc */

import React from 'react';
import {ipcRenderer} from 'electron';
import Renderer from '../utils/Renderer';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {address: ''};
        this.renderer = new Renderer('welcome', ipcRenderer);
        this.renderer.on('ready', () => this.renderer.on('server:address', (event, {port, address}) => {
            this.setState({address: `${address}:${port}`});
        }));
    }
    render() {
        return (
            <section>
                <aside className="hero mdc-dialog mdc-dialog--open">
                    <div className="mdc-dialog__surface">
                        <header className="mdc-dialog__header">
                            <h1 id="mdc-dialog-default-label" className="mdc-dialog__header__title">
                                Welcome!
                            </h1>
                        </header>
                        <section id="mdc-dialog-default-description" className="mdc-dialog__body">
                            <ul className="mdc-list">
                                <li className="mdc-list-item">
                                    <span className="mdc-list-item__graphic">1</span>
                                    Scan the
                                    <strong>&nbsp;QR code&nbsp;</strong> with your phone.
                                </li>
                                <li className="mdc-list-item">
                                    <span className="mdc-list-item__graphic">2</span>
                                    Enter the
                                    <strong>&nbsp;website&nbsp;</strong> you want to display on this screen.
                                </li>
                                <li className="mdc-list-item">
                                    <span className="mdc-list-item__graphic">3</span>
                                    Press
                                    <strong>&nbsp;update&nbsp;</strong> to show the website.
                                </li>
                            </ul>
                            <p>
                                Note: the server should be accessible from&nbsp;
                                <strong id="address">
                                    {this.state.address}
                                </strong>
                            </p>
                        </section>
                    </div>
                </aside>
            </section>
        );
    }
}
