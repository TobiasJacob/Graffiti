import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
  }
  handleImageLoaded() {
    this.scrollToBottomIfNeeded();
  }
  componentDidUpdate() {
    this.scrollToBottomIfNeeded();
  }
  joinChannel(e){
    e.preventDefault(); 
    let val = this.refs.input.value;
    console.log(this);
    if(val && val !== "") {
        this.props.history.push('/channel/' + this.props.match.params.channel + '/' + val);
    }
    else {
        alert('Pleas enter a name');
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar is-fixed-top" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img src="/logo203.png" alt="Logo" />
            </a>
            <span className="navbar-item">{this.props.match.params.channel}</span>
          </div>
        </nav>
        <section className="container center">
            <h1 className="title">Enter your name</h1>
            <form className="form" onSubmit={this.joinChannel.bind(this)}>
                <label className="label">Name</label>
                <div className="control field">
                    <input className="input" type="text" placeholder="Name" ref="input" />
                </div>
                <div className="control">
                    <input className="button" type="submit" value="Join"/>
                </div>
            </form>
        </section>

      </div>
    );
  }
}

export default App;