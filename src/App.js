import React, { Component } from 'react';
import fire from './fire';
import FileUploader from 'react-firebase-file-uploader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByChild('channel').limitToLast(100).equalTo(this.props.match.params.channel);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { message: snapshot.val(), id: snapshot.key };
      this.setState({ messages: this.state.messages.concat(message) });
    })
    messagesRef.once('value', snapshot => {
      this.refs.end.scrollIntoView({ behavior: "instant", block: "end" });
    })

  }
  handleImageLoaded() {
    this.scrollToBottomIfNeeded();
  }
  componentDidUpdate() {
    this.scrollToBottomIfNeeded();
  }
  scrollToBottomIfNeeded() {
    if (this.refs.end.getBoundingClientRect().y < window.innerHeight + 200) {
      this.refs.end.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }
  addMessage(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push({ text: this.inputEl.value, channel: this.props.match.params.channel, user: this.props.match.params.user });
    this.inputEl.value = ''; // <- clear the input
  }
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    //this.setState({avatar: filename, progress: 100, isUploading: false});
    fire.storage().ref('images').child(filename).getDownloadURL().then(imageURL => {
      fire.database().ref('messages').push({ imageURL, channel: this.props.match.params.channel, user: this.props.match.params.user });
    });
  };
  render() {
    return (
      <div>
        <nav className="navbar is-fixed-top" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://graffiti-85757.firebaseapp.com/">
              <img src="/logo203.png" alt="Logo" />
            </a>
            <span className="navbar-item">{this.props.match.params.channel}</span>
          </div>
        </nav>
        <section className="container">
          {
            this.state.messages.map(message => (
              <div className="usermessage" key={message.id}>
              {
                message.message.user && <p className="has-text-weight-bold">{message.message.user}</p>
              }
                {
                  message.message.text ?
                    <p>{message.message.text}</p> :
                    <img onLoad={this.handleImageLoaded.bind(this)} src={message.message.imageURL} alt="Message" />
                }
              </div>
            ))
          }
        </section>
        <div className="placeholder" ></div>
        <div
          ref="end">
        </div>
        <form className="inputForm" onSubmit={this.addMessage.bind(this)}>
          <div className="inputDiv">
            <input className="input" type="text" ref={el => this.inputEl = el} />
            <input className="button" type="submit" />

            <label className="button">
              +
            <FileUploader
                accept="image/*"
                hidden
                name="message"
                randomizeFilename
                storageRef={fire.storage().ref('images')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </label>
          </div>
        </form>

      </div>
    );
  }
}

export default App;