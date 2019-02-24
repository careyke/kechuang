/**
 * Container
 */
import React, { Component } from 'react';
import styles from './Container.less';
import Header from './Header';
import Body from './Body';

export default function Container(props) {
    return (
        <div className={styles['container']} >
            <Header />
            <Body />
        </div>
    )
}