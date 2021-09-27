import React, { Component } from 'react';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {return <div id="welcome">
    <span>Choose your game:</span>
    <button
    className={`${this.props.mode === 1 ? "welcome-button-pressed" : "welcome-button"}`}
    id="choose-shell-game"
    onClick={() => {this.props.changeMode(1)}}>
    Shell Game
    </button>
    <button
    className={`${this.props.mode === 2 ? "welcome-button-pressed" : "welcome-button"}`}
    id="memory-card-game-button"
    onClick={() => {this.props.changeMode(2)}}>
    Memory Card Game
    </button>
    {this.props.mode === 2 && <input type="number"min="8" value={this.props.memoryCardCapacity}
    max="12" onChange={(e) => this.props.changeMemoryCardCapacity(e.target.value)}></input>}
    </div>
  }
}
