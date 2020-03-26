import React, { Component } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons'

export default class ShuffleButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {return (
    <span className="switch-button"
    onClick={() => {this.props.switchCardsPositions(this.props.actualIndex1, this.props.actualIndex2)}}>
    {this.props.index1+1} <Icon icon={faArrowsAltH}/> {this.props.index2+1} </span>
  )}
}
