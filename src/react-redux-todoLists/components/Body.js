/**
 * Body
 */
import React, { Component } from 'react';
import styles from './Body.less';

export default class Body extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles['body']}>
                <div className={styles['todoContainer']}></div>
            </div>
        )
    }
}