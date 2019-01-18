/**
 * Footer
 */
import React from 'react';
import classnames from 'classnames';
import styels from './Footer.less';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClear = () => {
        let { deleteCompletedTodos } = this.props.store;
        deleteCompletedTodos();
    }

    getLeftNum = () => {
        let { todolist, leftTodos } = this.props.store;
        return { leftNum: leftTodos, hideClear: todolist.length === 0 || leftTodos === todolist.length }
    }

    render() {
        let { activeKey, switchTab, store } = this.props;
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

export default Footer;