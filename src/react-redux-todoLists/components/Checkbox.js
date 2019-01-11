/**
 * checkbox
 */
import React, { Component } from 'react';
import classnames from 'classnames'
import styles from './Checkbox.less';

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles['checkbox']}>
                <span className={styles['icon']}></span>
            </div>
        )
    }
}