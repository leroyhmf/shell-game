import React, { Component } from 'react';

export default class ImgDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return <div id="image-display">
    {this.props.images.map((src,index) => {return <img
      className="dis-image"
      key={`dis-${index}`} src={src}/>}) }
    </div>
    }

}
