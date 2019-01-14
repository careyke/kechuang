/**
 * Footer
 */
import React from 'react';
import classnames from 'classnames';
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
        return { leftNum: leftList.size, hideClear: todolist.size === 0 || leftList.size === todolist.size }
    }

    render() {
        let { activeKey, switchTab } = this.props;
        let info = this.getLeftNum();
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
                <div className={clearClass} onClick={this.handleClear} >{'Clear Completed'}</div>
            </div>
        )
    }
}