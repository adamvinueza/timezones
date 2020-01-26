# TDD with the timezones service

Test-driven development (TDD) is a valuable skill for writing clean, correct
code. We'll be practicing it some using this repository.

## Why TDD?

TDD is often sold to tech organizations as a development strategy on the grounds
that it boosts productivity. While productivity is currently a fashionable thing
to focus on these days, boosting it is not why you should learn TDD. The real
reason you should learn TDD is that it helps you save mental effort later on
when making changes to your code. If your code needs to change, and _you already
wrote tests that verify it does what it should_, it's much easier to make
changes, because you're _already_ thinking in terms of ensuring that the changes
you make meet an explicit standard.

That's a very important thing to keep in mind: testing is the process of
ensuring that your code meets a set of explicit standards. If you set the
standards yourself, you're in for far fewer surprises when you write your code.

## TDD broken down

### The "test" part

Testing, at its simplest, involves the following steps:

1. Create an expected value for an operation that produces a value.
2. Perform the operation.
3. Compare the value produced by the operation with the expected value.

You can get as fancy as you like with your testing, but it's generally better to
keep your tests as simple as possible. You can't save mental effort with TDD if
your tests require a lot of effort to understand!

### The "driven" part

We want our tests to _drive_ the writing of our code. This means, first, that we
have to _write the tests first_. But how are we to do that, if we haven't
written any code yet? How do I test something I haven't built yet?

The idea is for the test to express the design of what you're building. For
example, if you're building a calculator, you want your addition function to
produce the sum of two numbers; so your test should look something like this
(pseudocode):
```
expected <= 5
actual <= calculator.add(2, 3)
assertEqual(expected, actual)
```
Obviously, this test will fail if you haven't written any code yet! It might not
even compile. But it does clearly express what you want the calculator to do, at
least when it comes to adding numbers.

That's what you'll be doing when writing tests: describe, through test examples,
how your application is supposed to work.

### The "development" part

OK, so you've written a failing test. What now?

You should do two things: 

1. Get the test to pass, as quickly as possible.
2. Rewrite the code until it's good.

Here's a simple example, in pseudocode, of a function that gets the above test
to pass:
```
function calculator.add(x, y) {
  return 5
}
```
Of course, this code will fail as soon as you add a test that adds any numbers
that don't sum to 5. So let's do that--in fact, let's add a whole bunch of them
at once:
```
MAX_NUM = 10
for i <= 0; i < MAX_NUM; i++ {
  for j <= 0; j < MAX_NUM; j++ {
    expected <= i + j
    actual <= calculator.add(i, j)
    assertEqual(expected, actual)
  }
}
```
The above code will fail this test, so it has to be rewritten to make the test
pass. It's easy to do that, of course:
```
function calculator.add(x, y) {
  return x + y
}
```
Moreover, it's hard to see what else needs to be done to make the code clean;
that's the benefit (and drawback) to using over-simple examples. But at least
this example illustrates how you might write code to make a test pass. We'll get
to a more useful example later on, after we've started working.

## Testing with mocha and chai

For our testing, we'll be using the [mocha](https://mochajs.org/) framework with
the [chai](https://www.chaijs.com/) assertion library. While there are many,
many frameworks and libraries available for testing, these two are both widely
used and very useful for teaching testing concepts.

The basic units of a mocha test are `describe` and `it` functions. Your test
describes a piece of functionality, and each `it` function exercises the thing
you're testing to see if it behaves in a way it specifies. To understand this
better, let's look at `localTimeTest.js` (note the text below includes line
numbers):
```javascript
 1 const chai = require('chai');
 2 const chaiHttp = require('chai-http');
 3 const moment = require('moment-timezone');
 4 const server = require('../server');
 5 const should = chai.should();
 6 const expect = chai.expect;
 7 chai.use(chaiHttp);
 8
 9 const PARSE_STRICT = true; // always be strict when parsing date strings
10 const endpoint = '/local-time'
11
12 describe(`GET /local-time`, () => {
13   it('Should get an ISO 8601 date string', done => {
14     chai.request(server)
15       .get(endpoint)
16       .end((err, res) => {
17         expect(err).to.be.null;
18         res.should.have.status(200);
19         const actual = new moment(res.text, moment.ISO_8601, PARSE_STRICT);
20         actual.isValid().should.equal(true);
21         done();
22       });
23   });
24 });
```
This test describes how the `/local-time` endpoint is supposed to behave. The
`it` function says that it should return a string in ISO 8601 format, and the
test simply uses the moment library to parse the string, treating it as if it
were an ISO 8601 string. If the object returned is valid, the test passes.

There's a lot going on in this test, but most of it is just scaffolding. We're
making a GET request against the server using the `chai-http` library, then
calling `end()`, which takes a function to execute when the request is handled.
That function checks the response to ensure it came back with the right HTTP
status code, and that it contains the right content.

You don't have to understand all the details of this. What matters is that you
can reproduce code like this to create your own tests. You should have this
template in mind:
```javascript
chai.request(server)
  .{HTTP_METHOD}
  .end((err, res) => {
    handleError(err);
    testResponse(res);
  });
```
We want to _handle_ the error, generally speaking. Some of our tests may expect
the code to result in an error!

Also, we want to make sure the response is appropriate. A request may not cause
the server to throw an exception, but still be invalid--for example, if the
caller was not authenticated, or if the input parameters were invalid. In those
cases we might want the response to have a different HTTP status code (e.g., 401
for being unauthorized, or 400 for submitting a bad request).

OK, that's enough about scaffolding. If we run this test, we see that it fails:
```shell
> ./run_tests.sh
Creating network "timezones_default" with the default driver
Creating timezones_timezones_1 ... done
Attaching to timezones_timezones_1
timezones_1  |
timezones_1  | > timezones@1.0.0 test /usr/src/app
timezones_1  | > mocha --timeout 10000
timezones_1  |
timezones_1  |
timezones_1  |
timezones_1  | Listening at http://localhost:3000
timezones_1  |   GET /local-time
timezones_1  |     1) Should get a parseable ISO 8601 date string
timezones_1  |
timezones_1  |
timezones_1  |   0 passing (180ms)
timezones_1  |   1 failing
timezones_1  |
timezones_1  |   1) GET /local-time
timezones_1  |        Should get a parseable ISO 8601 date string:
timezones_1  |
timezones_1  |       Uncaught AssertionError: expected false to equal true
timezones_1  |       + expected - actual
timezones_1  |
timezones_1  |       -false
timezones_1  |       +true
timezones_1  |
timezones_1  |       at /usr/src/app/test/localTimeTest.js:20:33
timezones_1  |       at Test.Request.callback (node_modules/superagent/lib/node/index.js:716:12)
timezones_1  |       at IncomingMessage.<anonymous> (node_modules/superagent/lib/node/index.js:916:18)
timezones_1  |       at endReadableNT (_stream_readable.js:1215:12)
timezones_1  |       at processTicksAndRejections (internal/process/task_queues.js:84:21)
timezones_1  |
timezones_1  |
timezones_1  |
timezones_1  | npm ERR! Test failed.  See above for more details.
timezones_timezones_1 exited with code 1
Removing timezones_timezones_1 ... done
Removing network timezones_default
```
The key part of this output are these lines:
```shell
timezones_1  |       Uncaught AssertionError: expected false to equal true
timezones_1  |       + expected - actual
timezones_1  |
timezones_1  |       -false
timezones_1  |       +true
timezones_1  |
timezones_1  |       at /usr/src/app/test/localTimeTest.js:20:33
```
What does this mean? On line 18 is the chai assertion that the result of the
call on `actual.isValid()` is true. The `actual` object is the result of this
call on line 17:
```javascript
16       const actual = new moment(res.text, moment.ISO_8601, PARSE_STRICT);
```
This call attempts to construct a `moment` object from the response text, with
the requirement that [the text be formatted as an ISO 8601
string](https://momentjs.com/guides/#/parsing/known-formats/).  And [`moment`
objects have an `isValid` method](https://momentjs.com/docs/#/parsing/string/)
to indicate whether they are, in fact, valid. So let's look at what the
`/local-time` endpoint actually returns. We can see that in `localTime.js`. Here
is the entirety of that file:
```javascript
const moment = require('moment-timezone');

// Returns the local time as an ISO 8601 string in the specified time zone.
const localTime = async tzName => {
  return '';
};
module.exports = localTime;
```
That is, the `localTime` function returns the empty string! And clearly the
empty string is not a valid ISO 8601 string.

How do we make this test pass? Well, let's try returning a date string:
```javascript
const localTime = async tzName => {
  // format() returns a string version of the created moment, which by default
  // is in ISO 8601 format
  return new moment().format();
};
module.exports = localTime;
```
Now, if we run our test, it passes:
```shell
Creating network "timezones_default" with the default driver
Creating timezones_timezones_1 ... done
Attaching to timezones_timezones_1
timezones_1  |
timezones_1  | > timezones@1.0.0 test /usr/src/app
timezones_1  | > mocha --timeout 10000
timezones_1  |
timezones_1  |
timezones_1  |
timezones_1  | Listening at http://localhost:3000
timezones_1  |   GET /local-time
timezones_1  |     ✓ Should get a parseable ISO 8601 date string (72ms)
timezones_1  |
timezones_1  |
timezones_1  |   1 passing (108ms)
timezones_1  |
timezones_timezones_1 exited with code 0
Removing timezones_timezones_1 ... done
Removing network timezones_default
```
Congratulations, you got your first test to pass!

Run `git commit -am 'got my first test to pass, hooray!' && git push` to
celebrate.

## Handling queries and validating time-zone names

We have one passing test. Let's see if we can flesh out our `/local-time`
endpoint. When we call with a valid time zone name, such as
"America/Los_Angeles", we want to get back the current time, localized to that
time zone (otherwise known as Pacific Time). And we want some way of telling the
user that a time zone name is _not_ valid: the only acceptable time-zone names
are those from the [TZ database](https://www.iana.org/time-zones). So if someone
submits a request with a name that's not from that database, such as
"Pacific-Time" or "GMT" or "dog", we want to say that the request is bad and
provide an appropriate error message.

So let's write some tests to verify the following:

1. A request with no query string returns the local UTC time.
2. A request with the query "America/Los_Angeles" returns the time in Los
   Angeles (UTC -8h).
3. A request with the query "America/Denver" returns the time in Denver (UTC
   -8h).
4. A request with the query "America/Chicago" returns the time in Chicago
   (UTC -6h).
5. A request with the query "Europe/Brussels" returns the time in Brussels,
   Belgium (UTC +1h).
6. A request with the query "dog" returns a 400 response, with the error
   message "'dog' is not a valid TZ database name".


