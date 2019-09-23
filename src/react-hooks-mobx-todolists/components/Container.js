/**
 * Container
 */
import React from 'react';
import styles from './Container.less';
import Header from './Header';
import Body from './Body';

export function Container() {
    return (
        <div className={styles['container']} >
            <Header />
            <Body />
        </div>
    )
}