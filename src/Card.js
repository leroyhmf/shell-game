import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.cardsStatus
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


  render() {
    return <div className="card-position" style={
      {transform: `translate(${this.props.cardPosition})`}}
      key={this.props.key}>
    <div className={this.generateClass(this.props.index)}>
    <div className={'innerCard'} style={
      {width: `${this.props.cardSize.w}vw`,
      height: `${this.props.cardSize.h}vh`}
    }>
    <div className={'back'} onDoubleClick={this.updateState}></div>
    <img alt="card front" className={'front'}
    onClick={this.updateState}
    src={this.props.src}
    />
    </div>
    </div></div>
  }
}
