import React, { Component } from 'react';
import './App.css';
import FileInput from './FileInput.js';
import Game from './Game.js'
import Scoreboard from './Scoreboard.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appPart: 1,
      /*
       * 1: Select 3 Photos
       * 0: Error loading
       * 2: All three cards are shown
       * 3: All three cards will now switch to flipped and can be moved around
       * 4: All three cards are shown again
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
  }

  updatePlayers(player) {
    //Also initiates player points
    this.setState({players: [...this.state.players, player],
      playerPoints: [...this.state.playerPoints, 1]})
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
    this.setState( {imagesBase64: [...this.state.imagesBase64, image]});
    if (this.state.imagesBase64.length === 3) {
      this.setState({appPart: 2})
    }
  }

  errorHandler(error) {
    this.setState({error: error})
  }

  render() {
    if (this.state.appPart === 1) {
      return <div className="App">
      <FileInput errorHandler={this.errorHandler} manageImages={this.manageImages}/>
      </div>
    }
    if (this.state.appPart > 1) {
      return (<div><Game images={this.state.imagesBase64}/>
        <Scoreboard updatePlayers={this.updatePlayers}
        playerPoints={this.state.playerPoints}
        addStarToPlayer={this.addPointToPlayer}
        removeStarFromPlayer={this.removePointFromPlayer}
        players={this.state.players}/></div>)
    }

  };
}

export default App;
