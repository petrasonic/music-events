const config = require('./config');
const db = require('./db');
const express = require('express');
const app = express();
const router = express.Router();

app.listen(config.HOST_PORT);

// get the music events
router.get('/get-events', (req, res) => {
  const events = db.getEvents.map((event, index) =>{
    event.id = index;
    return event;
  });
  res.json(events);
});

// Namespace the API
app.use('/api', router);

// Default/ 404
app.route('/*').get(((req, res) => { res.sendStatus(404); }));
