/* eslint-disable strict */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const playstore = require('./playstore');

const app = express();

app.use(cors());
// app.use(morgan('common'));

app.get('/apps', (req, res) => {
  let { sort, genres } = req.query;
  let results = playstore;
  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res.status(400).send('Sort must be one of rating or app');
    }
  }

  if (genres) {
    if (
      !['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(
        genres.toLowerCase()
      )
    ) {
      return res
        .status(400)
        .send(
          'Genres must be one of action, puzzle, strategy, casual, arcade, or card'
        );
    }
  }

  if (genres) {
    results = results.filter((r) => {
      return r.Genres.toUpperCase() === genres.toUpperCase();
    });
  }


  if (sort) {
    results.sort((a, b) => {
      sort = sort.charAt(0).toUpperCase() + sort.substring(1);
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);
});

module.exports = app;
