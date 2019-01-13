/**
 * Footer
 */
import React from 'react';
import styels from './Footer.less';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClear = () => {
        this.props.clearCompleteTodos();
    }

    getLeftNum = () => {
        let { todolist } = this.props;
        let leftList = todolist.filter((todo) => {
            return todo.get('completed') !== true
        })
        return leftList.size;
    }

    render() {
        let { activeKey, switchTab } = this.props;
        return (
            <div className={styels['footer']}>
                <div className={styels['banner']}>{`${this.getLeftNum()} items left`}</div>
                <div className={styels['tab']}>
                    <button className={activeKey === 0 ? styels['activeBtn'] : null} onClick={() => { switchTab(0) }} >{'All'}</button>
                    <button className={activeKey === 1 ? styels['activeBtn'] : null} onClick={() => { switchTab(1) }}>{'Active'}</button>
                    <button className={activeKey === 2 ? styels['activeBtn'] : null} onClick={() => { switchTab(2) }}>{'Completed'}</button>
                </div>
                <div className={styels['clear']} onClick={this.handleClear} >{'Clear Completed'}</div>
            </div>
        )
    }
}