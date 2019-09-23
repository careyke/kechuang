/**
 * Footer
 */
import React from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import styels from './Footer.less';
import store from '../store';

@observer
export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { showClearCompleted, activeTab, switchTab, clearCompletedTodos, unfinishTodoNum } = store;
        let clearClass = classnames({
            [styels['clear']]: true,
            [styels['hideClear']]: !showClearCompleted
        })
        return (
            <div className={styels['footer']}>
                <div className={styels['banner']}>{`${unfinishTodoNum} items left`}</div>
                <div className={styels['tab']}>
                    <button className={activeTab === 0 ? styels['activeBtn'] : null} onClick={() => { switchTab(0) }} >{'All'}</button>
                    <button className={activeTab === 1 ? styels['activeBtn'] : null} onClick={() => { switchTab(1) }}>{'Active'}</button>
                    <button className={activeTab === 2 ? styels['activeBtn'] : null} onClick={() => { switchTab(2) }}>{'Completed'}</button>
                </div>
                <div className={clearClass} onClick={clearCompletedTodos} >{'Clear Completed'}</div>
            </div>
        )
    }
}