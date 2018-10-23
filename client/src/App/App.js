import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import axios from 'axios';
import './App.css';

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
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h1" gutterBottom className="main-title">
              Upcoming Events
            </Typography>
          </Grid>
          {musicEvents.map(musicEvent => (
            <Grid container item xs={12} spacing={24} key={musicEvent.id} className="event-wrapper">
              <Grid item md={2} xs={3} className="date">
                <div className="month">{moment(musicEvent.DATE).format('MMM')}</div>
                <div className="day">{moment(musicEvent.DATE).format('DD')}</div>
              </Grid>
              <Grid item md={10} xs={9} key={musicEvent.id}>
                <Typography variant="h2" gutterBottom>
                  {musicEvent.ARTIST}
                </Typography>
                <p className="time-details">{moment(`${musicEvent.DATE} ${musicEvent.TIME}`).format('ddd, MMM DD, h:mm a')}</p>
                <p className="venue">{`Location: ${musicEvent.VENUE}`}</p>
                <p className="price">{`${musicEvent.PRICE}`}</p>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <button onClick={this.getMusicEvents}>Refresh</button>
      </div>
    );
  }
}

export default App;
