const chai = require('chai');
const chaihttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../server');

chai.should();
chai.use(chaihttp);

describe('API testing', () => {
  describe('GET /api/products/:id', () => {
    it(`it should response status as 200`, (done) => {
      chai
        .request(server)
        .get('/api/products/2')
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe('GET /api/products/categories', () => {
    it(`it should response status as 200`, (done) => {
      chai
        .request(server)
        .get('/api/products/categories')
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it(`the response should be an array`, (done) => {
      chai
        .request(server)
        .get('/api/products/categories')
        .end((err, response) => {
          response.body.should.be.a('array');
          done();
        });
    });
  });

  describe('GET /api/products', () => {
    it(`it should response status as 200`, (done) => {
      chai
        .request(server)
        .get('/api/products')
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it(`the response should be an array`, (done) => {
      chai
        .request(server)
        .get('/api/products')
        .end((err, response) => {
          response.body.content.should.be.a('array');
          done();
        });
    });
  });
});
