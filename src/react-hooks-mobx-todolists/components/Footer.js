/**
 * Footer
 */
import React, { useCallback } from 'react';
import { useObserver } from 'mobx-react-lite';
import classnames from 'classnames';
import styels from './Footer.less';
import { useStore } from '../customHooks';

export default function Footer() {
    const { switchTab, activeTab, unfinishTodoNum, clearCompletedTodos,showClearCompleted } = useStore();
    const handleClear = useCallback(() => {
        clearCompletedTodos();
    }, [])
    const clearClass = classnames({
        [styels['clear']]: true,
        [styels['hideClear']]: !showClearCompleted
    })
    return useObserver(() => (
        <div className={styels['footer']}>
            <div className={styels['banner']}>{`${unfinishTodoNum} items left`}</div>
            <div className={styels['tab']}>
                <button className={activeTab === 0 ? styels['activeBtn'] : null} onClick={() => { switchTab(0) }} >{'All'}</button>
                <button className={activeTab === 1 ? styels['activeBtn'] : null} onClick={() => { switchTab(1) }}>{'Active'}</button>
                <button className={activeTab === 2 ? styels['activeBtn'] : null} onClick={() => { switchTab(2) }}>{'Completed'}</button>
            </div>
            <div className={clearClass} onClick={handleClear} >{'Clear Completed'}</div>
        </div>
    ))
}
