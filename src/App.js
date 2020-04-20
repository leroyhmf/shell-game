import React, { Component } from 'react';
import './App.css';
import FileInput from './FileInput.js';
import Game from './Game.js';
import Scoreboard from './Scoreboard.js';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appPart: 1,
      /*
       * 1: Select 3 Photos
       * 0: Error loading
       * 2: All three cards are shown
       */
      error: false,
      players: [],
      playerPoints: [],
      imagesBase64: [],
      cardsStatus: [false, false, false],
      //cards are originally flipped
      cardsPosition: this.setCardsPosition(true),
      trackedPositions: this.setTrackedPositions(true)
      }

    this.changeCardStatus = this.changeCardStatus.bind(this);
    this.switchCardsPositions = this.switchCardsPositions.bind(this);
    this.appendCardToLists = this.appendCardToLists.bind(this);
    this.updateGraphicPositions = this.updateGraphicPositions.bind(this);
    this.manageImages = this.manageImages.bind(this);
    this.updatePlayers = this.updatePlayers.bind(this);
    this.addPointToPlayer = this.addPointToPlayer.bind(this);
    this.removePointFromPlayer = this.removePointFromPlayer.bind(this);
    this.changeAppPart = this.changeAppPart.bind(this);
    this.setCardsPosition = this.setCardsPosition.bind(this);

  }

  setTrackedPositions(init) {
    let cardsLength = 3;
    if (init === false) {
      let images = this.state.imagesBase64;
      if (images.length === 3) { return }
      // don't init locations again on selection of 3 cards
      cardsLength = images.length;
    }
    let trackedPositions = {};
    let l;
    for (l = 0; l < cardsLength; l++) {
      trackedPositions[l] = l;
    }
    if (init === true) {return trackedPositions}
    else {this.setState({trackedPositions: trackedPositions})}
    }
  setCardsPosition(init) {
    let cardsLength = 3;
    if (init === false) {
      let images = this.state.imagesBase64;
      if (images.length === 3) { return }
      // don't init locations again on selection of 3 cards.
      //we already do this on app start.
      cardsLength = images.length;
    }
    let cardPositions = [];
    for (let l = 0; l < cardsLength; l++) {
      cardPositions.push(this.calculateCardPosition(l, init))
    }
    if (init === true) {return cardPositions}
    else {
      this.setState({cardsPosition: cardPositions})
    }
    }
  calculateCardPosition(index, init) {
    //calculate the added card's position graphically
    let viewWidth = 96;
    let x;
    let y;
    if (init === true) {
      x = 4 + index*32;
      //the 4 is because if the cards is too the left its ugly.
      y = 46.4; }
    else {
      let cardNum = this.state.imagesBase64.length;
      x = 2 + index*viewWidth/cardNum;
      y= 46.4;
    }
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

  appendCardToLists() {
    let trackedPositions = this.state.trackedPositions;
    let lastTrackedPosition = Object.keys(trackedPositions).length-1;
    trackedPositions[lastTrackedPosition] = lastTrackedPosition;
    this.setState({
        cardsStatus: [...this.state.cardsStatus, false],
        cardsPosition: this.updateGraphicPositions(),
        trackedPositions: trackedPositions
          })
    }

  updateGraphicPositions() {
    return this.state.cardsPosition
    }


  updatePlayers(player) {
    //Also initiates player points
    this.setState({players: [...this.state.players, player],
      playerPoints: [...this.state.playerPoints, 0]})
  }

  changeAppPart(partNum) {
    if (partNum === 1) {
      this.setState({appPart: 1},
      this.updateCards)
    }
    if (partNum === 2) {
      this.setState({appPart: 2},
      this.updateCards)
    }
  }

  updateCards() {
    if (this.state.appPart === 1) {
      this.setState({imagesBase64: [],
      cardsStatus: [false, false, false],
      //cards are originally flipped
      cardsPosition: this.setCardsPosition(true),
      trackedPositions: this.setTrackedPositions(true)})
    }
    if (this.state.appPart === 2) {
    this.setCardsPosition(false);
    this.setTrackedPositions(false);
    this.setState({
      cardsStatus: this.state.imagesBase64.map((e, index) => {
        if (this.state.cardsStatus[index]) {return this.state.cardsStatus[index]}
        else {return false}})
        //update with the new card's flip status
      })
    }
  }

  addPointToPlayer(index) {
    let playerPoints = this.state.playerPoints;
    let newPlayerPoints = [...playerPoints];
    newPlayerPoints[index] = newPlayerPoints[index] + 1;
    console.log(newPlayerPoints);
    this.setState({
      playerPoints: newPlayerPoints
    })
  }

  removePointFromPlayer(index) {
    let playerPoints = this.state.playerPoints;
    let newPlayerPoints = [...playerPoints];
    newPlayerPoints[index] = newPlayerPoints[index] - 3;
    console.log(newPlayerPoints);
    this.setState({
      playerPoints: newPlayerPoints
    })
  }

  manageImages(image) {
    // if (this.state.imagesBase64.length < 3) {
    //Restrict more than 3 images - commented out
    this.setState( {imagesBase64: [...this.state.imagesBase64, image]});
    // }
    if (this.state.imagesBase64.length >= 3) {
      this.changeAppPart(2)
    }
  }

  errorHandler(error) {
    this.setState({error: error})
  }

  render() {
    let display = []
    if (this.state.appPart === 1) {
      display.push(<div key="fileinput">
      <FileInput errorHandler={this.errorHandler} manageImages={this.manageImages}/>
      </div>)
    }
    if (this.state.appPart > 1) {
      display.push(<div key="game"><Game
        cardsStatus={this.state.cardsStatus}
        cardsPosition={this.state.cardsPosition}
        trackedPositions={this.state.trackedPositions}
        switchCardsPositions={this.switchCardsPositions}
        images={this.state.imagesBase64}/>
        <FileInput extra={true} errorHandler={this.errorHandler} manageImages={this.manageImages}/>
        <Icon icon={faChevronLeft} className="back-button" onClick={() => this.changeAppPart(1)}/></div>)
    }
    display.push(<Scoreboard key="scoreboard" updatePlayers={this.updatePlayers}
      playerPoints={this.state.playerPoints}
      addStarToPlayer={this.addPointToPlayer}
      removeStarFromPlayer={this.removePointFromPlayer}
      players={this.state.players}/>)
    return display

  };
}

export default App;
