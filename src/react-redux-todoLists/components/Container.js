/**
 * Container
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './Container.less';
import Header from './Header';
import Body from './Body';

export default class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles['container']} >
                <Header />
                <Body />
            </div>
        )
    }
}