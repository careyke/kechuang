import React from 'react';

export class ReactState extends React.Component{
  constructor(props){
    super(props);
    this.state={
      num:1
    }
  }

  componentDidMount(){
    
  }

  handleClick=()=>{
    this.setState({num:this.state.num+1})
    console.log(this.state.num);
  }

  render(){
    return (
      <button onClick={this.handleClick}>click</button>
    )
  }
}