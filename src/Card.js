import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
    this.generateClass = this.generateClass.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  generateClass(index) {
    if (this.state.open === true) {return `card c${index}`} else {return `card show c${index}`}
    //show is show the back
  }

  updateState() {
    this.setState({open: !this.state.open})
  }

  getDefaultPosition (index) {
    let x = 60 + index*490;
    let y = 350;
    return {x: x, y: y}
  }

  render() {
    return <Draggable
      defaultPosition={this.getDefaultPosition(this.props.index)}
      key={this.props.key}>
    <div className={this.generateClass(this.props.index)}>
    <div className={'innerCard'}>
    <div className={'back'} onDoubleClick={this.updateState}></div>
    <img className={'front'}
    onDoubleClick={this.updateState}
    onDragStart={function(e) {e.preventDefault()}}
    src={this.props.src}
    />
    </div>
    </div></Draggable>
  }
}
