import React from 'react';

export default class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
        };
    }

    onChange({target: {value: url}}) {
        this.setState({url});
    }

    onUpdate() {
        socket.emit('change', {url: this.state.url});
    }

    onReset() {
        socket.emit('reset');
    }
    
    render() {
        return (
            <div>
                <div className="mdc-layout-grid">
                    <div className="mdc-layout-grid__cell">
                        <p>
                            Welcome! you can change the website being
                            displayed on your computer here.
                        </p>
                    </div>
                </div>
                <div className="mdc-layout-grid">
                    <div className="mdc-layout-grid__cell">
                        <div className="mdc-text-field mdc-text-field--fullwidth">
                            <input id="url-input-field"
                                className="mdc-text-field__input"
                                type="text"
                                placeholder="Please enter a URL"
                                aria-label="Enter a new URL here"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="none"
                                onChange={(e) => this.onChange(e)} />
                        </div>
                    </div>
                </div>
                <div className="mdc-layout-grid">
                    <div className="mdc-layout-grid__cell">
                        <button id="url-update-button"
                            className="mdc-button mdc-button--raised"
                            onClick={() => this.onUpdate()}>
                            Update
                        </button>
                        <button id="url-reset-button"
                            className="mdc-button mdc-button--secondary mdc-button--raised"
                            onClick={() => this.onReset()}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}