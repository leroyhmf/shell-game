import React, { Component } from 'react';
import './App.css';
import FileInput from './FileInput.js';
import Game from './Game.js'

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
      error: false
    }
    this.manageImages = this.manageImages.bind(this);
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
      return <Game images={this.state.imagesBase64}/>
    }

  };
}

export default App;
