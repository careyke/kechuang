/**
 * checkbox
 */
import React, { ReactElement } from 'react';
import classnames from 'classnames'
import styles from './Checkbox.less';
import { useToggleCheckbox } from '../customHooks'
import { IDispatchActionShape } from '../type'

interface ICheckboxShape {
    isAll?: boolean;
    show?: boolean;
    selected: boolean | undefined;
    toggleAllTodos?: IDispatchActionShape;
    toogleTodo?: (selected: boolean) => void;
}

//TODO: useMemo 减少更新
export default function Checkbox(props: ICheckboxShape): ReactElement {
    let { selected, handleClick } = useToggleCheckbox(props);
    let iconClassName = classnames({
        [styles['icon']]: true,
        [styles['selectedIcon']]: selected,
        [styles['hide']]: props.show === false
    })
    return (
        <div className={styles['checkbox']}>
            <span className={iconClassName} onClick={handleClick} ></span>
        </div>
    )
}