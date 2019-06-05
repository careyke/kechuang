/**
 * Container
 */
import React, { ReactElement } from 'react';
import styles from './Container.less';
import Header from './Header';
import Body from './Body';


export default function Container(props:{}): ReactElement {
    return (
        <div className={styles['container']} >
            <Header />
            <Body />
        </div>
    )
}