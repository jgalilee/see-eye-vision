/* eslint-disable max-len, require-jsdoc */

import React from 'react';
import Header from './Header';
import Update from './Update';
import Mousepad from './Mousepad';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header>See Eye Vision</Header>
                <main>
                    <div className="mdc-toolbar-fixed-adjust">
                        <Update />
                        <Mousepad />
                    </div>
                </main>
            </div>
        );
    }
}
