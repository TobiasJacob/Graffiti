import React, { Component } from 'react';
import fire from './fire';
import FileUploader from 'react-firebase-file-uploader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByChild('channel').limitToLast(100).equalTo(this.props.match.params.channel);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { message: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
      console.log(this.state.messages);
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( {text: this.inputEl.value, channel: this.props.match.params.channel} );
    this.inputEl.value = ''; // <- clear the input
  }
  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    //this.setState({avatar: filename, progress: 100, isUploading: false});
    fire.storage().ref('images').child(filename).getDownloadURL().then(imageURL => {
      fire.database().ref('messages').push( {imageURL, channel: this.props.match.params.channel} );
    });
  };
  render() {
    console.log(this.state.messages);
    return (
      <form onSubmit={this.addMessage.bind(this)}>
        <input type="text" ref={ el => this.inputEl = el }/>
        <input type="submit"/>
        <p>-{this.props.match.params.channel}-</p>
        <ul>
          { 
            this.state.messages.map( message => {
              if(message.message.text)
                return <li key={message.id}>{message.message.text}</li>
              else
                return <li key={message.id}>
                <img src={message.message.imageURL} height="100" alt="Image"/>
                </li>
          } )
          }
        </ul>
        <FileUploader
            accept="image/*"
            name="message"
            randomizeFilename
            storageRef={fire.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
      </form>
    );
  }
}

export default App;