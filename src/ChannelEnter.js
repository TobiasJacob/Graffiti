import React, { Component } from 'react';
import App from './App';

class ChannelEnter extends Component {
  constructor(props) {
    super(props);
    this.state = {
         name: "",
         loggedIn: false 
        }; 
  }
  componentWillMount(){
  }
  componentDidUpdate() {
  }
  handleInputChange(e) {
    this.setState({name: e.target.value});
  }
  joinChannel(e){
    e.preventDefault(); 
    let val = this.refs.input.value;
    if(val && val !== "") {
        this.setState({loggedIn: true});
        //this.props.history.push('/channel/' + this.props.match.params.channel + '/' + val);
    }
    else {
        alert('Pleas enter a name');
    }
  }
  render() {
      if(this.state.loggedIn) {
          return <App channel={this.props.match.params.channel} user={this.state.name}/>
      }
    return (
      <div>
        <nav className="navbar is-fixed-top" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
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
                    <input className="input" type="text" placeholder="Name" ref="input" value={this.state.name} onChange={this.handleInputChange.bind(this)}/>
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

export default ChannelEnter;