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

it('/apps?sort=app should return an array of apps sorted by name, 200 OK', () => {
  return request(app)
    .get('/apps')
    .query({ sort: 'app' })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array').with.lengthOf.at.least(1);
      expect(res.body[0]).to.have.keys(requiredKeys);


      let i = 0;
      let sorted = true;

      while(sorted && i < res.body.length - 1) {
        sorted = sorted && res.body[i].App < res.body[i + 1].App;
        i++;
      }

      expect(sorted).to.be.true;
    });
});



// /apps?sort=FOOBAR
  // should return 400
  // should have specific error message
  // should not have a content-type
  // body should empty


  it('/apps?genres=card should return an array of apps with the genre "card", 200 OK', () => {
    return request(app)
      .get('/apps')
      .query({ genres: 'card' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array').with.lengthOf.at.least(1);
        expect(res.body[0]).to.have.keys(requiredKeys);

        let allCard = true;

        res.body.forEach((app) => {
          if (app.Genres.toLowerCase() !== 'card') {
            allCard = false;
          }
        });

        expect(allCard).to.be.true;
      });
  });


// /apps?genres=FOOBAR
  // should return 400
  // should have specific error message
  // should not have a content-type
  // body should empty
