import React, { Component } from 'react';
import Card from './Card.js';
import ShuffleButton from './ShuffleButton.js';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
     cardsStatus: [false, false, false],
     cardsPosition: this.setInitialCardsPosition(),
     trackedPositions: this.setTrackedPositions()
     //cards are not flipped originally, images are shown
    }
    this.changeCardStatus = this.changeCardStatus.bind(this);
    this.switchCardsPositions = this.switchCardsPositions.bind(this);
  }
    setTrackedPositions() {
      let trackedPositions = {};
      let l;
      for (l = 0; l < this.props.images.length; l++) {
        trackedPositions[l] = l;
      }
      return trackedPositions
    }
    setInitialCardsPosition() {
      let cardsPosition = []
      let l;
      for (l = 0; l < this.props.images.length; l++) {
        cardsPosition.push(this.setInitialCardPosition(l))
      }
      return cardsPosition
    }

    setInitialCardPosition(index) {
      let x = 4 + index*32;
      let y = 46.4;
      return `${x}vw, ${y}vh`
    }

    switchCardsPositions(index1, index2) {
      console.log(index1, index2)
      let cardPosition1 = this.state.cardsPosition[index1];
      let cardPosition2 = this.state.cardsPosition[index2];
      let cardsPosition = [...this.state.cardsPosition];
      cardsPosition[index1] = cardPosition2;
      cardsPosition[index2] = cardPosition1;
      let trackedPosition = this.state.trackedPositions;
      const key1 = Object.keys(trackedPosition).find(key => trackedPosition[key] === index1);
      const key2 = Object.keys(trackedPosition).find(key => trackedPosition[key] === index2);
      trackedPosition[key2] = index1;
      trackedPosition[key1] = index2;
      console.log(cardsPosition);
      this.setState({cardsPosition: cardsPosition, trackedPositions: trackedPosition})
    }

    changeCardStatus(i) {
      let cardsStatus = this.state.cardsStatus;
      cardsStatus[i] = !this.state.cardsStatus[i];
      this.setState({cardsStatus: cardsStatus})
    }

    render() {
    return <div> {this.props.images.map((src, index) => { return <div key={`card${index+1}`} >
    <Card
      cardPosition={this.state.cardsPosition[index]}
      index={index} src={src}/></div> }) }
      <div className="shuffle-buttons">{this.props.images.map((src, index) => {
        if (index !== 0) {
          return <ShuffleButton actualIndex1={this.state.trackedPositions[index-1]}
          index1={index-1} index2={index}
          actualIndex2={this.state.trackedPositions[index]}
          switchCardsPositions={this.switchCardsPositions}
          />
        }
        else {
          return <ShuffleButton actualIndex1={this.state.trackedPositions[this.props.images.length-1]}
          index1={0} index2={this.props.images.length-1}
          actualIndex2={this.state.trackedPositions[0]}
          switchCardsPositions={this.switchCardsPositions}
          />
        }
      })}</div>
      </div>
  }
}
