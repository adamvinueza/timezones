const chai = require('chai');
const chaiHttp = require('chai-http');
const moment = require('moment-timezone');
const server = require('../server');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const PARSE_STRICT = true; // always be strict when parsing date strings
const endpoint = '/local-time';

describe(`GET ${endpoint}`, () => {
  it('Should get a parseable ISO 8601 date string', done => {
    chai.request(server)
      .get(endpoint)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        const actual = new moment(res.text, moment.ISO_8601, PARSE_STRICT);
        actual.isValid().should.equal(true);
        done();
      });
  });
  it('Should return the current time as UTC with no query string', done => {
    chai.request(server)
      .get(endpoint)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        // const expected = ? 
        const actual = new moment(res.text, moment.ISO_8601, PARSE_STRICT);
        actual.isValid.should.equal(true);
        // compare actual and expected here
        done()
    });
  });
  it('Should return 7 am UTC as midnight Denver time (UTC -7h)', done => {
    chai.request(server)
      .get(endpoint)
      .query({}) // what goes into the query part?
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        // const expected = ? 
        const actual = new moment(res.text, moment.ISO_8601, PARSE_STRICT);
        actual.isValid.should.equal(true);
        // compare actual and expected here
        done()
    });
  });
  it('Should return 7 am UTC as 1 am Chicago time (UTC -6h)', done => {
    chai.request(server)
      .get(endpoint)
      .query({}) // what goes into the query part?
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        // const expected = ? 
        const actual = new moment(res.text, moment.ISO_8601, PARSE_STRICT);
        actual.isValid.should.equal(true);
        // compare actual and expected here
        done()
    });
  });
  it('Should return 7 am UTC as 9 am Basel time (UTC +1h)', done => {
    chai.request(server)
      .get(endpoint)
      .query({}) // what goes into the query part?
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        // const expected = ? 
        const actual = new moment(res.text, moment.ISO_8601, PARSE_STRICT);
        actual.isValid.should.equal(true);
        // compare actual and expected here
        done()
    });
  });
  it('Should return a 400 response when the time zone specified is invalid', done => {
    chai.request(server)
      .get(endpoint)
      .query({}) // what goes into the query part?
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(400);
        // const expected = ? 
        // const actual = ?
        done()
      });
  });
});
