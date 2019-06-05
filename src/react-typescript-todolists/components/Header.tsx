/**
 * Header
 */
import React, { ReactElement } from 'react';
import styles from './Header.less';

export default function Header(props:{}):ReactElement {
    return (
        <div className={styles['header']}>
            <span className={styles['text']}>todos</span>
        </div>
    )
}