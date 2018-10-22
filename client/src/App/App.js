import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    musicEvents: [],
  }

  getData = () => {
    axios.get('/api/get-events').then((res) => {
      console.log(res);
      this.setState({musicEvents: res.data})
    });
  }
  render() {
    const { musicEvents } = this.state;
    console.log(musicEvents);
    return (
      <div className="App">
        {musicEvents.map(musicEvent => (
          <div className="event">{musicEvent['ON SALE']}</div>
        ))}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.getData}>Get Data</button>
        </header>
      </div>
    );
  }
}

export default App;
