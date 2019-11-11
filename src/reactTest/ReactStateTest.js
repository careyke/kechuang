import React, { useState, useEffect, useContext } from 'react';

export const ReactStateTest = () => {
  const [num, setNum] = useState(0)
  const [text, setText] = useState('text');
  const handleClick = () => {
    // setTimeout(()=>{
    //   setNum(num + 1);
    //   console.log(num);
    //   setText(text + 1);
    //   console.log(text);
    // },1000)
    setNum(num + 1);
    setText(text + 1);
    // new Promise((resolve, reject) => {
    //   resolve();
    // }).then(() => {
    //   setNum(num + 1);
    //   setText(text + 1);
    // })
  }
  useEffect(() => {
    setNum(num + 1);
    setText(text + 1);
  }, [])
  console.log('render')
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <span>{num}</span>
      <span>{text}</span>
      <button onClick={handleClick}>click</button>
    </div >
  )
}

export class ReactClassStateTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      text: 'text'
    }
  }
  handleClick = () => {
    // setTimeout(()=>{
    //   this.setState({
    //     num: this.state.num + 1
    //   });
    //   console.log(this.state.num);
    //   this.setState({
    //     text: this.state.text + 1
    //   });
    // },1000)
    this.setState({
      num: this.state.num + 1
    });
    console.log(this.state.num);
    this.setState({
      text: this.state.text + 1
    });
    console.log(this.state.text);
  }
  render() {
    console.log('render');
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <span>{this.state.num}</span>
        <span>{this.state.text}</span>
        <button onClick={this.handleClick}>click</button>
      </div >
    )
  }
}