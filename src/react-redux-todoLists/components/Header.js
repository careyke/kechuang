/**
 * Header
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './Header.less';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles['header']}>
                <span className={styles['text']}>todos</span>
            </div>
        )
    }
}