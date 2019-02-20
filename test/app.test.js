const expect  = require('chai').expect;
const request = require('supertest');
const app     = require('../app');

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
  'Last Updated',
];


it('/apps should return an array of apps, 200 OK', () => {
  return request(app)
    .get('/apps')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array').with.lengthOf.at.least(1);
      expect(res.body[0]).to.have.keys(requiredKeys);
    });
});

// /apps
  // should return 200
  // should be content type json
  // should return an array, geater than 0
  // array items should have the keys...

// /apps?sort=app
  // should return 200
  // should be content type json
  // should be an array with length greater than 0
  // array items should have the keys...
  // array items should be sorted

// /apps?sort=FOOBAR
  // should return 400
  // should have specific error message
  // should not have a content-type
  // body should empty

// /apps?genres=card
  // should return 200
  // should be content type json
  // should return an array with length greater htan 0
  // array items should have the keys...
  // array items should all have genres=card

// /apps?genres=FOOBAR
  // should return 400
  // should have specific error message
  // should not have a content-type
  // body should empty
