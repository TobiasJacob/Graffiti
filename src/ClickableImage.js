import React, { Component } from 'react';
import ImagePopup from './ImagePopup';

class ClickableImage extends Component {
    popup() {
        this.refs.popup.popup();
    }
    render() {
        return (<div>
            <img className="msgImg" onLoad={this.props.handleImageLoaded} src={this.props.imageURL} onClick={this.popup.bind(this)} alt="Message" ref="image" />
            <ImagePopup imageURL={this.props.imageURL} ref="popup"/>
        </div>)
    }
}

export default ClickableImage;