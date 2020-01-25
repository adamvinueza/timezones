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
});
