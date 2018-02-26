/* eslint-disable max-len, require-jsdoc */

import React from 'react';

export default class Mousepad extends React.Component {
    static getTouchCoords(event) {
        const {changedTouches} = event;
        const [touch] = changedTouches;
        const {clientX, clientY} = touch;
        return {clientX, clientY};
    };

    constructor(props) {
        super(props);
        this.keyboard = null;
        this.mousePad = null;
    }

    onKeyboardClick() {
        if (this.keyboard === null) {
            return;
        }
        this.keyboard.focus();
    }

    onKeyboardPress(event) {
        const {char, key, code, charCode} = event;
        event.preventDefault();
        socket.emit('keypress', {char, key, code, charCode});
    }

    onMousepadClick(event) {
        event.preventDefault();
        if (event.clientX < this.mousePad.offsetWidth / 2) {
            socket.emit('mouseclick', {button: 'left'});
        } else {
            socket.emit('mouseclick', {button: 'right'});
        }
    }

    onMousepadDown(event) {
        socket.emit('mousedown');
    }

    onMousepadUp(event) {
        socket.emit('mouseup');
    }

    onMousepadMove(event) {
        event.preventDefault();
        const {clientX, clientY} = Mousepad.getTouchCoords(event);
        const screenWidth = this.mousePad.offsetWidth;
        const screenHeight = this.mousePad.offsetHeight;
        socket.emit('mousemove', {
            screenWidth,
            screenHeight,
            clientX: clientX - this.mousePad.offsetLeft,
            clientY: clientY - this.mousePad.offsetTop,
        });
    }

    render() {
        return (
            <div className="mdc-card">
                <div id="keyboard" onClick={() => this.onKeyboardClick()}>
                    <input id="keyboard-input" type="text"
                        ref={(input) => this.keyboard = input}
                        onKeyUp={(event) => this.onKeyboardPress(event)}/>
                    Keyboard
                </div>
                <div id="mouse-pad"
                    ref={(input) => this.mousePad = input}
                    onClick={(event) => this.onMousepadClick(event)}
                    onTouchMove={(event) => this.onMousepadMove(event)}
                    onTouchStart={(event) => this.onMousepadDown(event)}
                    onTouchEnd={(event) => this.onMousepadUp(event)}>
                    Mousepad
                </div>
            </div>
        );
    }
}