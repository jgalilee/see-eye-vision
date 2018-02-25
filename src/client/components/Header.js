/* eslint-disable max-len, require-jsdoc */

import React from 'react';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }

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
