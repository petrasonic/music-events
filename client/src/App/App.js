import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    musicEvents: [],
  }

  constructor(props) {
    super(props);

    this.getMusicEvents();
  }

  getMusicEvents = () => {
    axios.get('/api/get-events').then((res) => {
      console.log(res);
      this.setState({musicEvents: res.data})
    });
  }

  render() {
    const { musicEvents } = this.state;

    return (
      <div className="App">
        <ul>
        {musicEvents.map(musicEvent => (
          <li className="event" key={musicEvent.id}>{musicEvent['ON SALE']}</li>
        ))}
        </ul>
        <button onClick={this.getMusicEvents}>Refresh</button>
      </div>
    );
  }
}

export default App;
