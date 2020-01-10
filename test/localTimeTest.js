const chai = require('chai');
const chaiHttp = require('chai-http');
const moment = require('moment-timezone');
const server = require('../server');
const validator = require('../validator');
const should = chai.should();

chai.use(chaiHttp);

const endpoint = '/local-time';

describe(`GET ${endpoint}`, () => {
  it('Should get the local time in UTC', done => {
    const expected = moment().utc().format();
    chai.request(server)
      .get(endpoint)
      .end((err, res) => {
        res.should.have.status(200);
        const actual = res.text;
        expected.should.equal(actual)
        done();
      });
  });

  it('Should get the local time in Los Angeles', done => {
    const losAngeles = 'America/Los_Angeles';
    const expected = moment().tz(losAngeles).format();
    chai.request(server)
      .get(endpoint)
      .query({tz: losAngeles})
      .end((err, res) => {
        res.should.have.status(200);
        const actual = res.text;
        expected.should.equal(actual)
        done();
      });
  });

  it('Should get the local time in New York', done => {
    const ny = 'America/New_York';
    const expected = moment().tz(ny).format();
    chai.request(server)
      .get(endpoint)
      .query({tz: ny})
      .end((err, res) => {
        res.should.have.status(200);
        const actual = res.text;
        expected.should.equal(actual)
        done();
      });
  });

  it('Should return an error message for an invalid time zone', done => {
    const badTimezone = 'foo';
    const expected = validator.getErrorMessage(badTimezone);
    chai.request(server)
      .get(endpoint)
      .query({tz: badTimezone})
      .end((err, res) => {
        res.should.have.status(200);
        const actual = res.text;
        expected.should.equal(actual)
        done();
      });
  });
});
