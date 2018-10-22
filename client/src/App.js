import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    music: [],
  }

  getData = () => {
    axios.get('/api/get-events').then((res) => {
      console.log(res);
      this.setState({music: JSON.stringify(res.data)})
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        <button onClick={this.getData}>Get Data</button>
        <pre>{this.state.music}</pre>
        </header>
      </div>
    );
  }
}

export default App;
