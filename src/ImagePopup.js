import React, { Component } from 'react';

class ImagePopup extends Component {
    constructor(props) {
        super(props);
        this.state = { popup: false, isLandscape: true };
    }
    componentDidMount() {
        this.resize();
    }
    handleImageLoaded() {
        this.resize();
    }
    popup() {
        this.setState({ popup: true });
        this.resize();
        window.addEventListener('resize', this.resize.bind(this))
    }
    popdown() {
        this.setState({ popup: false });
        window.removeEventListener('resize', this.resize.bind(this))
    }
    resize() {
        let isLandscape = true;
        if(this.refs.image) {
            isLandscape = window.innerHeight / window.innerWidth > this.refs.image.naturalHeight / this.refs.image.naturalWidth; 
        }
        if(this.state.isLandscape !== isLandscape)
            this.setState({isLandscape});
    }
    render() {
        if (this.state.popup) {
            return (
                <div className="modal is-active">
                    <div className="modal-background" style={{zIndex: -10}} onClick={this.popdown.bind(this)} ></div>
                    <img src={this.props.imageURL} onClick={this.popdown.bind(this)} alt="Message" style={!this.state.isLandscape ?{ height: "100%", width: "auto"}: {width: "100%", height: "auto"}} ref="image"/>
                </div>
            )
        }
        return (<div className="modal">
                <div className="modal-background" style={{zIndex: -10}} onClick={this.popdown.bind(this)} ></div>
                <img onLoad={this.handleImageLoaded.bind(this)} src={this.props.imageURL} onClick={this.popdown.bind(this)} alt="Message" style={!this.state.isLandscape ?{ height: "100%", width: "auto"}: {width: "100%", height: "auto"}} ref="image"/>
            </div>)
    }
}

export default ImagePopup;