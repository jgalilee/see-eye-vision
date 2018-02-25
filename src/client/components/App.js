import React from 'react';
import Header from './Header';
import Update from './Update';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header>See Eye Vision</Header>
                <main>
                    <div className="mdc-toolbar-fixed-adjust">
                        <Update />
                    </div>
                </main>
            </div>
        );
    }
}
