import React, { Component } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import './App.css';
import EventListItem from '../EventListItem';
import NextIcon from '../NextIcon';
import PreviousIcon from '../PreviousIcon';

class App extends Component {
  state = {
    musicEvents: [],
    searchQuery: ''
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    let { musicEvents, searchQuery } = this.state;
    musicEvents = musicEvents.filter(event => event['ON SALE'].toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <div className="App">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h1" gutterBottom className="main-title">
              Upcoming Events
            </Typography>
          </Grid>
          <TextField
            id="search"
            label="Search"
            className="search-bar"
            value={this.state.searchQuery}
            onChange={this.handleChange('searchQuery')}
            margin="normal"
          />
          {musicEvents.map(musicEvent => (
            <EventListItem musicEvent={musicEvent} />
          ))}
        </Grid>
        <Grid item xs={12} className="pagination-button-container">
          <Button>Previous <PreviousIcon /></Button>
          <Button>Next <NextIcon /></Button>
        </Grid>
      </div>
    );
  }
}

export default App;
