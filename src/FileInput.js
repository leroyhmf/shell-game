import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

export default class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getBase64 = this.getBase64.bind(this)
    this.fileInput = React.createRef();
  }


  getBase64(e) {
    for (const file of e.target.files) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.props.manageImages(reader.result)
      };
      reader.onerror = function (error) {
        this.props.errorHandler(error)
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getBase64(event);
  }

  render() {
    return (
      <form onChange={this.handleSubmit} className="file-input">
          <label for="select-images">
            <Icon icon={faUpload}/>
          </label>
          <input id="select-images" type="file" ref={this.fileInput} multiple={true} accept="image/*"/>
        <br />
      </form>
    );
  }
}
