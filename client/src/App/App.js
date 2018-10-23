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
    searchQuery: '',
    paginationIndex: 0,
  }

  constructor(props) {
    super(props);

    this.pageSize = 6;
    this.getMusicEvents();
  }

  getMusicEvents = () => {
    axios.get('/api/get-events').then((res) => {
      this.setState({musicEvents: res.data})
    });
  }

  handleSearchChange = event => {
    this.setState({
      searchQuery: event.target.value,
      paginationIndex: 0,
    });
  }

  loadNextPage = () => {
    const { paginationIndex } = this.state;
    this.setState({ paginationIndex: paginationIndex + this.pageSize });
  }
  loadPreviousPage = () => {
    const { paginationIndex } = this.state;
    this.setState({ paginationIndex: paginationIndex - this.pageSize });
  }

  render() {
    const {
      musicEvents,
      searchQuery,
      paginationIndex
    } = this.state;
    let filteredMusicEvents = [...musicEvents];
    filteredMusicEvents = filteredMusicEvents.filter(event => event['ON SALE'].toLowerCase().includes(searchQuery.toLowerCase()));
    filteredMusicEvents = filteredMusicEvents.slice(paginationIndex, paginationIndex + this.pageSize);

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
            onChange={this.handleSearchChange}
            margin="normal"
          />
          {filteredMusicEvents.map(musicEvent => (
            <EventListItem musicEvent={musicEvent} key={musicEvent.id} />
          ))}
        </Grid>

        <Grid item xs={12} className="pagination-button-container">
          {paginationIndex > 0 && <Button onClick={this.loadPreviousPage}>Previous <PreviousIcon /></Button>}
          {musicEvents.length > (paginationIndex + this.pageSize) && <Button onClick={this.loadNextPage}>Next <NextIcon /></Button>}
        </Grid>

      </div>
    );
  }
}

export default App;
