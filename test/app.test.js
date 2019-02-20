/* eslint-disable strict */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

const requiredKeys = [
  'App',
  'Category',
  'Rating',
  'Reviews',
  'Size',
  'Installs',
  'Type',
  'Price',
  'Genres',
  'Android Ver',
  'Current Ver',
  'Content Rating',
  'Last Updated'
];

it('/apps should return an array of apps, 200 OK', () => {
  return request(app)
    .get('/apps')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body)
        .to.be.an('array')
        .with.lengthOf.at.least(1);
      expect(res.body[0]).to.have.keys(requiredKeys);
    });
});

it('/apps?sort=app should return an array of apps sorted by name, 200 OK', () => {
  return request(app)
    .get('/apps')
    .query({ sort: 'app' })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body)
        .to.be.an('array')
        .with.lengthOf.at.least(1);
      expect(res.body[0]).to.have.keys(requiredKeys);

      let i = 0;
      let sorted = true;

      while (sorted && i < res.body.length - 1) {
        sorted = sorted && res.body[i].App < res.body[i + 1].App;
        i++;
      }

      expect(sorted).to.be.true;
    });
});

it('/apps?sort=foobar should give 400 error', () => {
  return request(app)
    .get('/apps')
    .query({ sort: 'foobar' })
    .expect(400, 'Sort must be one of rating or app')
    .then(res => 
      expect(res.body).to.be.empty);
});

it('/apps?genres=card should return an array of apps with the genre "card", 200 OK', () => {
  return request(app)
    .get('/apps')
    .query({ genres: 'card' })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body)
        .to.be.an('array')
        .with.lengthOf.at.least(1);
      expect(res.body[0]).to.have.keys(requiredKeys);

      let allCard = true;

      res.body.forEach(app => {
        if (app.Genres.toLowerCase() !== 'card') {
          allCard = false;
        }
      });

      expect(allCard).to.be.true;
    });
});

it('/apps?genres=foobar should give 400 error', () => {
  return request(app)
    .get('/apps')
    .query({ genres: 'foobar' })
    .expect(400, 'Genres must be one of action, puzzle, strategy, casual, arcade, or card')
    .then(res => 
      expect(res.body).to.be.empty);
});

