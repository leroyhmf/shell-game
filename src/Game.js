import React, { Component } from 'react';
import Card from './Card.js'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
     cardsStatus: [false, false, false],
     //cards are not flipped originally
    }
    this.changeCardStatus = this.changeCardStatus.bind(this);
  }

    changeCardStatus(i) {
      let cardsStatus = this.state.cardsStatus;
      cardsStatus[i] = !this.state.cardsStatus[i];
      this.setState({cardsStatus: cardsStatus})
    }

  render() {
    return this.props.images.map((src, index) => { return <Card key={`card${index+1}`} index={index} src={src}/> })
  }
}
