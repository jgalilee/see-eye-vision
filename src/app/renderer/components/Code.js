import React from 'react';
import QRCode from 'qrcode-react';
import {ipcRenderer} from 'electron';
import Renderer from '../utils/Renderer';

export default class Code extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: 'no url recieved'};
        this.renderer = new Renderer('code', ipcRenderer);
        this.renderer.on('ready', () => {
            this.renderer.on('server:code', (event, url) => this.setState({
                url,
            }));
        });
    }

    render() {
        return (
            <div className="code">
                <QRCode value={this.state.url} />
            </div>
        );
    }
}
