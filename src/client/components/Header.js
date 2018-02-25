import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header className="mdc-toolbar mdc-toolbar--fixed">
                <div className="mdc-toolbar__row">
                    <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                        <span className="mdc-toolbar__title">
                            {this.props.children}
                        </span>
                    </section>
                </div>
            </header>
        );
    }
}
