import React, { Component } from 'react';

export default class MemoryCard extends Component {
  constructor(props) {
      super(props);
      this.state = {}
    }

  determineSize() {
    if (this.props.size === 8) {
      return 'big-card'}
    else {return ''}
  }

  render() {
    const size = this.determineSize()
    return <div className="card-position" key={`pos-${this.props.card.id}-${this.props.card.type}`}>
    <div className={`memory-card ${size} ${!this.props.card.opened && 'show'}`}>
    <div className={`innerCard memory-card ${size}
    ${this.props.card.matchedAnimation && 'animated rubberBand'}`}
      >
    <div className={'back'} onClick={() => {
      this.props.updateState(this.props.card)
    }}></div>
    <img alt="card front" className={'front'}
    onClick={() => {this.props.updateState(this.props.card)}}
    src={this.props.src}
    />
    </div>
    </div></div>
  }
}
