/**
 * test
 */
import React from 'react';
import ReactDOM from 'react-dom';


export default function exeReactTest() {
    let appDom = document.querySelector('#app');
    ReactDOM.render(
        <Container></Container>
        , appDom);
}

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: 0
        }
    }

    componentWillMount() {
        // this.setState({
        //     label: 'summer'
        // }, () => {
        //     this.dom.style.color='#ff0000'
        // })
    }

    componentDidMount() {
        // alert('out');
    }

    handleClick = () => {
        this.setState({
            label: ++this.state.label
        })
    }

    render() {
        return <div ref={r => this.dom = r} onClick={this.handleClick} >{this.state.label}</div>
    }
}