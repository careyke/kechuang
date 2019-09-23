/**
 * Header
 */
import React, { Component } from 'react';
import styles from './Header.less';

export default function Header(props) {
    return (
        <div className={styles['header']}>
            <span className={styles['text']}>todos</span>
        </div>
    )
}