import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import SC from 'soundcloud';
import { CLIENT_ID } from '../soundcloundAuth';
import './EventListItem.css'

class EventListItem extends Component {
  constructor(props) {
    super(props);
    SC.initialize({
      client_id: CLIENT_ID
    });

    const updateArtist = (artistImage, artistURL) => {
      this.setState({ artistImage, artistURL });
    }

    const { ARTIST } = this.props.musicEvent;
    SC.get('/users', {
      q: ARTIST, limit: 1
    }).then((artists) => {
      if(artists.length > 0) {
        updateArtist(artists[0].avatar_url, artists[0].permalink_url);
      }
    });
  }

  state = {
    artistImage: 'http://a1.sndcdn.com/images/default_avatar_large.png',
    artistURL: '',
  }
  render() {
    const { musicEvent } = this.props;
    const { artistImage, artistURL } = this.state;

    return (
      <Grid container item xs={12} spacing={24} className="event-wrapper">

        <Grid item md={2} xs={3} className="date">
          <div className="month">{moment(musicEvent.DATE).format('MMM')}</div>
          <div className="day">{moment(musicEvent.DATE).format('DD')}</div>
        </Grid>

        <Grid container item md={10} xs={9}>

          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom>
              {musicEvent.ARTIST}
            </Typography>
          </Grid>

          <Grid item md={2} sm={4} xs={6} className="image">
            {artistImage && <img src={artistImage} alt={musicEvent.ARTIST} className="artist-img" />}
          </Grid>

          <Grid item md={10} sm={8} xs={6}>
            <p className="time-details">{moment(`${musicEvent.DATE} ${musicEvent.TIME}`).format('ddd, MMM DD, h:mm a')}</p>
            <p className="venue">{`Location: ${musicEvent.VENUE}`}</p>
            <p className="price">{`${musicEvent.PRICE}`}</p>
            {artistURL && <a href={artistURL} target="_blank" rel="noopener noreferrer">Listen on SoundCloud <span role="img" aria-label="headphones">🎧</span></a>}
          </Grid>

        </Grid>

      </Grid>
    );
  }
}

EventListItem.propTypes = {
  musicEvent: PropTypes.shape({
    id: PropTypes.number,
    'ON SALE': PropTypes.string,
    ARTIST: PropTypes.string,
    DATE: PropTypes.string,
    TIME: PropTypes.string,
    VENUE: PropTypes.string,
    PRICE: PropTypes.string,
  })
};
export default EventListItem;