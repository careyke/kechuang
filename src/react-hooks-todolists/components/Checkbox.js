/**
 * checkbox
 */
import React, { useState } from 'react';
import classnames from 'classnames'
import styles from './Checkbox.less';

//TODO: useMemo 减少更新
export default function Checkbox(props) {
    let [selected, setSelected] = useState(props.selected);
    let iconClassName = classnames({
        [styles['icon']]: true,
        [styles['selectedIcon']]: selected,
        [styles['hide']]: props.show === false
    })
    const handleClick = () => {
        let currentSelected = !selected;
        if (props.isAll) {
            props.toggleAllTodos(currentSelected);
        } else {
            props.toogleTodo(currentSelected);
        }
        setSelected(currentSelected);

    }

    return (
        <div className={styles['checkbox']}>
            <span className={iconClassName} onClick={handleClick} ></span>
        </div>
    )
}