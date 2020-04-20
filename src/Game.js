import React, { Component } from 'react';
import Card from './Card.js';
import ShuffleButton from './ShuffleButton.js';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
  return <div> {this.props.images.map((src, index) => { return <div key={`card${index+1}`} >
  <Card
    cardSize={this.props.cardSize}
    cardPosition={this.props.cardsPosition[index]}
    index={index}
    cardsStatus={this.props.cardsStatus[index]}
    src={src}/></div> }) }
    <div className="shuffle-buttons">{this.props.images.map((src, index) => {
      if (index !== 0) {
        return <ShuffleButton actualIndex1={this.props.trackedPositions[index-1]}
        key={`shuffle${index-1}${index}`}
        index1={index-1} index2={index}
        actualIndex2={this.props.trackedPositions[index]}
        switchCardsPositions={this.props.switchCardsPositions}
        />
      }
      else {
        return <ShuffleButton
        key={"shuffleedges"}
        actualIndex1={this.props.trackedPositions[this.props.images.length-1]}
        index1={0} index2={this.props.images.length-1}
        actualIndex2={this.props.trackedPositions[0]}
        switchCardsPositions={this.props.switchCardsPositions}
        />
      }
    })}</div>
    </div>
  }
}
