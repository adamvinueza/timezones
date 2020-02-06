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
        const expected = moment().utc();
        const actual = moment.parseZone(res.text) 
        actual.isValid().should.equal(true);
        // difference between actual and expected should be less than 1 second
        moment.duration(expected.diff(actual)).asSeconds().should.be.within(0, 1);
        // actual offset from UTC should be 0 minutes)
        actual.utcOffset().should.equal(0);
        done()
    });
  });
});
