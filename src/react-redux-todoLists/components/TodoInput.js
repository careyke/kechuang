/**
 * todoinput
 */
import React, { Component } from 'react';
import styles from './TodoInput.less';
import Checkbox from './Checkbox';

export default class TodoInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles['']}>
                <div className={styles['']}>
                    <Checkbox />
                </div>
                <div className={styles['']}></div>
            </div>
        )
    }
}