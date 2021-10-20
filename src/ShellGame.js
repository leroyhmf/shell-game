import React, { Component } from 'react';
import Card from './Card.js';
import ShuffleButton from './ShuffleButton.js';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faRandom } from '@fortawesome/free-solid-svg-icons'

export default class ShellGame extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.random = this.random.bind(this)
  }

  random(i=0) {
    const max = this.props.images.length;
    function getDistinctRandom(rand1) {
      let rand2 = Math.floor(Math.random() * max)
      if (rand2 === rand1) {
        return getDistinctRandom(rand1)
      }
      return rand2
    }
    if (i<10) {
      console.log('hi')
      let rand1 = Math.floor(Math.random() * max)
      let rand2 = getDistinctRandom(rand1)
      this.props.switchCardsPositions(rand1, rand2)
      setTimeout(()=>this.random(i+1), 685)
    }

  }

  render() {
  return <div> <div class="cards"> {this.props.images.map((src, index) => { return <div key={`card${index+1}`} >
  <Card
    cardSize={this.props.cardSize}
    cardPosition={this.props.cardsPosition[index]}
    index={index}
    cardsStatus={this.props.cardsStatus[index]}
    src={src}/></div> }) } </div>
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
    })}
    <Icon
    className="switch-button"
    icon={faRandom}
    onClick={() => this.random()}/>
    </div>
    </div>
  }
}
