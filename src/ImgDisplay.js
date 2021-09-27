import React, { Component } from 'react';

export default class ImgDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let num = 0;
    if (this.props.mode === 1) {
      num = 3-this.props.inProccess
    }
    else {
      num = this.props.memoryCardCapacity-this.props.inProccess
    }
    return <div id="image-display">
    {this.props.images.map((src,index) => {return <img
      className="dis-image" onClick={() => {this.props.removeImage(index)}}
      key={`dis-${index}`} src={src}/>}) }
      <div className="dis-image-more">Please select {num} more (Click on an image to remove it)</div>
    </div>
    }

}
