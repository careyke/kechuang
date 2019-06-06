/**
 * Footer
 */
import React, { useCallback, ReactElement } from 'react';
import classnames from 'classnames';
import styels from './Footer.less';
import { IDispatchActionShape, TodoItem } from '../type'
interface IFooterPropsShape {
    activeKey: number;
    clearCompleteTodos: IDispatchActionShape;
    switchTab: (n: number) => void;
    todolist: TodoItem[];
}

export default function Footer(props: IFooterPropsShape): ReactElement {
    let { activeKey, switchTab, clearCompleteTodos, todolist } = props;
    const handleClear = useCallback(() => {
        clearCompleteTodos();
    }, [])
    const getLeftNum = (): { leftNum: number, hideClear: boolean } => {
        let leftList = todolist.filter((todo) => {
            return todo.completed !== true
        })
        return { leftNum: leftList.length, hideClear: todolist.length === 0 || leftList.length === todolist.length }
    }
    let info = getLeftNum();
    let clearClass = classnames({
        [styels['clear']]: true,
        [styels['hideClear']]: info.hideClear
    })
    return (
        <div className={styels['footer']}>
            <div className={styels['banner']}>{`${info.leftNum} items left`}</div>
            <div className={styels['tab']}>
                <button className={activeKey === 0 ? styels['activeBtn'] : null} onClick={() => { switchTab(0) }} >{'All'}</button>
                <button className={activeKey === 1 ? styels['activeBtn'] : null} onClick={() => { switchTab(1) }}>{'Active'}</button>
                <button className={activeKey === 2 ? styels['activeBtn'] : null} onClick={() => { switchTab(2) }}>{'Completed'}</button>
            </div>
            <div className={clearClass} onClick={handleClear} >{'Clear Completed'}</div>
        </div>
    )
}
