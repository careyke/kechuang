/**
 * checkbox
 */
import React from 'react';
import { useObserver } from 'mobx-react-lite';
import classnames from 'classnames'
import styles from './Checkbox.less';
import { useToggleCheckbox } from '../customHooks'

//TODO: useMemo 减少更新
export default function Checkbox(props) {
    let { selected, handleClick } = useToggleCheckbox(props);
    let iconClassName = classnames({
        [styles['icon']]: true,
        [styles['selectedIcon']]: selected,
        [styles['hide']]: props.show === false
    })
    return useObserver(() => (
        <div className={styles['checkbox']}>
            <span className={iconClassName} onClick={handleClick} ></span>
        </div>
    ))
}