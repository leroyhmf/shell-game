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
      imagesBase64: [],
      error: false,
      players: [],
      playerPoints: []
    }
    this.manageImages = this.manageImages.bind(this);
    this.updatePlayers = this.updatePlayers.bind(this);
    this.addPointToPlayer = this.addPointToPlayer.bind(this);
    this.removePointFromPlayer = this.removePointFromPlayer.bind(this);
    this.changeAppPart = this.changeAppPart.bind(this);
  }

  updatePlayers(player) {
    //Also initiates player points
    this.setState({players: [...this.state.players, player],
      playerPoints: [...this.state.playerPoints, 1]})
  }

  changeAppPart(partNum) {
    if (partNum === 1) {
      this.setState({appPart: 1, imagesBase64: []})
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
    if (this.state.imagesBase64.length < 3) {
    //Restrict more than 3 images
    this.setState( {imagesBase64: [...this.state.imagesBase64, image]});
    }
    if (this.state.imagesBase64.length === 3) {
      this.setState({appPart: 2})
    }
  }

  errorHandler(error) {
    this.setState({error: error})
  }

  render() {
    let display = []
    if (this.state.appPart === 1) {
      display.push(<div className="App">
      <FileInput errorHandler={this.errorHandler} manageImages={this.manageImages}/>
      </div>)
    }
    if (this.state.appPart > 1) {
      display.push(<div><Game images={this.state.imagesBase64}/>
        <Icon icon={faChevronLeft} className="back-button" onClick={() => this.changeAppPart(1)}/></div>)
    }
    display.push(<Scoreboard updatePlayers={this.updatePlayers}
      playerPoints={this.state.playerPoints}
      addStarToPlayer={this.addPointToPlayer}
      removeStarFromPlayer={this.removePointFromPlayer}
      players={this.state.players}/>)
    return display

  };
}

export default App;
