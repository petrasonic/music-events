import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import './EventListItem.css'

const EventListItem = (props) => {
  const { musicEvent } = props;
  return (
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
  );
}

export default EventListItem;