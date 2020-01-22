# timezones

A simple REST API for managing dates and times with time zones.

Contents

- [Introduction](#introduction)
- [Quick Start](#quick-start)
  - [Install Docker](#install-docker)
  - [Install Node](#install-node)
  - [Fork this Repository](#fork-this-repository)
  - [Start the Application](#start-the-application)
  - [Stop the Application](#stop-the-application)
  - [Run the Unit Tests](#run-the-unit-tests)
- [The Task](#the-task)
- [TDD Guidelines](#tdd-guidelines)
- [Iterating with Docker](#iterating-with-docker)

## Introduction

This app is an exercise for practicing the red-green-refactor pattern in
test-driven development (TDD). It will also give you practice in a number of
widely-used technologies, such as Node, Express, and Docker.

You will need to install [Docker](https://hub.docker.com/?overlay=onboarding) so
that you can run Docker tools on your machine.

(For a super-quick introduction to Docker, read [Docker in 15
minutes](https://adamvinueza.github.io/docker/learning/2020/01/10/docker-in-fifteen.html).)

Also, you should download and install a relatively recent version of
[NodeJS](https://nodejs.org/en/download/). This way it'll be easier to diagnose
and debug issues independently of Docker.

Installing NodeJS will also install the `npm` tool, which you can use to install
packages that enable your application to run.

## Quick start

#### Install Docker
[Create a Docker account](https://hub.docker.com/signup) then follow the
instructions to install Docker.

#### Install Node
(Strictly speaking, Node isn't necessary for this exercise, but you'll want to
be able to develop Node applications outside of Docker containers.)

If you're using OS X, you might as well get started using Homebrew if you
haven't already:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Then run:
```
brew install node
```
If you're using Linux or Windows, use the [Node download
site](https://nodejs.org/en/download/) and follow the instructions.

#### Fork this repository
If you don't have a place where you keep all your git repositories, use ~/git:
```
mkdir ~/git
```

Navigate to the directory where you'll be installing the repository and
[fork](https://guides.github.com/activities/forking/) it. 

#### Start the application
Navigate to the forked repository and run `docker-compose` to start the
application:
```
cd ~/git/timezones
docker-compose up -d
```
Open a browser and enter this URL:
```
http://localhost:3000
```
You should see this:
```
Hello, World!
```
If you see that, congratulations! Your application works.

#### Stop the application
Run this command to stop the application (from the application directory):
```
docker-compose down
```
#### Run the unit tests
If you've run the application, you know it runs. But does it work properly?
Let's check by running the existing tests. The application directory contains a
bash script (or Windows .bat file) that runs the tests. If you're using bash,
run:
```
./run_tests.sh
```
If you're using a Windows machine, run:
```
./run_tests.bat
```
That command should run the unit tests already written and built into the
application's `package.json` file. You should see output similar to this:
```
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
timezones_1  |     1) Should get the local time in UTC
timezones_1  |     ✓ Should get the local time in Los Angeles
timezones_1  |     ✓ Should get the local time in New York
timezones_1  |     ✓ Should return an error message for an invalid time zone name
timezones_1  |
timezones_1  |
timezones_1  |   3 passing (139ms)
timezones_1  |   1 failing
timezones_1  |
timezones_1  |   1) GET /local-time
timezones_1  |        Should get the local time in UTC:
timezones_1  |      Uncaught AssertionError: expected -0.016 to be within 0..1
timezones_1  |       at /usr/src/app/test/localTimeTest.js:23:24
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
This suggests that one of the tests is failing, so the application clearly does
NOT work properly.

## The task

The timezones application exposes the following two REST endpoints:
```
===============
GET /local-time
===============

http://localhost:3000/local-time?tz=TZ_NAME

  Gets the current time localized to the specified time zone, as an ISO-8601
  formatted string. The time zone name must be a valid TZ database name, as
  defined by IANA (https://www.iana.org/time-zones).  If none is provided, the
  time returned is localized to Universal Time Coordinated (UTC). If an invalid
  time zone is provided, the string returned should be "Invalid time zone: "
  followed by the time zone provided.

PARAMETERS:

  TZ_NAME  A valid TZ database name

=================
GET /convert-time
=================

http://localhost:3000/convert-time?time=ISO_8601_TIME&tz=TZ_NAME

  Gets the specified ISO 8601 formatted datetime string and returns an ISO 8601
  formatted string representing that time in the specified time zone.  The time
  zone name must be a valid TZ database name, as defined by IANA
  (https://www.iana.org/time-zones).  If no time is provided, the current time
  is used. If no time zone name is provided, the time returned is localized to
  UTC. If an invalid time zone is provided, the string returned should be
  "Invalid time zone: " followed by the time zone provided.

PARAMETERS:

  ISO_8601_TIME  A valid ISO-8601 formatted datetime string
  TZ_NAME        A valid TZ database name
```

The application source code contains `localTime` and `convertTime` directories,
whose files handle the routes documented above.

The `/local-time` endpoint is handled correctly, except for one failing test.
You should verify that the test is written correctly. If it is, fix the code;
if it isn't, fix the test.

Next, examine the files in the `localTime` directory, and the tests in the
`test` directory, as a guide to fixing the code in the `convertTime` directory.
Try to follow the RGR procedure to write tests like those in
`localTimeTests.js`, then get the tests to pass and clean up your code. You
should write each test _first_; it will of course fail given the function as
written.

The point of this part of the exercise is to think carefully and methodically
about what the _intent_ of the API is, and to write tests that capture this
intent.

Once you've done that, pay attention to how the files in `localTime` are
organized and consider why they have been written in that way. Contrast them to
the file in `convertTime`.  Is it easier or harder to write tests for one or the
other case? Why?

## TDD guidelines

This pattern goes as follows:

1. Write a valid test that fails.
2. Get the test to pass as quickly as possible.
3. Rewrite the code that got the test to pass so that it's actually good.

The basic testable unit in TDD is the _requirement_. In this case, the units are
the API requirements.

A test should have the general GIVEN-WHEN-THEN form. For example: **GIVEN** the
user wants the current time in a specific time zone, **WHEN** it is January 1,
2020, 8 a.m. in Denver and localTime is called with the string "America/Denver",
localTime **SHOULD** return "2019-01-01T01:00:00-07:00".

## Iterating with Docker

When you build a Docker container, it exists independently of the code on your
machine, because you've copied the code onto the container. To verify that, run
the test script once (which will build a container if it hasn't been built
already), then make a change to the code that changes a test result (e.g.,
comment out a test). Run the test script again, and you'll see that nothing has
changed, because `docker-compose` doesn't rebuild containers by default.

There are several ways around this issue. The first is to find and delete the
Docker container, then re-run the script:
```
docker image rm timezones_timezones:latest
./run_tests.sh
```
But this can get tiresome. Is there a way to get your changes onto a container
that's already been built? As it happens, there is, by using the `volumes`
element in the `docker-compose` file. Open `docker-compose.test.yml` and you'll
see this:
```
version: '3'
services:
  timezones:
    build:
      context: .
      dockerfile: Dockerfile
    command: npm test
```
Add the following lines to the file, between the `build` and `command` sections:
```
    volumes:
       - .:/usr/src/app
```
This will mount your application source code to its corresponding location
specified in the application's Dockerfile. Re-run the test script, and you
should see your changes applied.

Another way is simpler and faster, but requires Node to be installed on your
machine, and may not follow the same paths. From your application directory, run
the command:
```
npm test
```
This will run the tests specified in the `package.json` file. If you look there,
you'll see this section:
```
  "scripts": {
    "test": "mocha --timeout 10000",
    "start": "node server.js"
  },
```
The `"test"` key says that if you run the `npm` command with the `test`
parameter, the command `mocha --timeout 10000` will be run.

What this means, of course, is that this project uses the [mocha test
framework](https://mochajs.org/) for its testing. (As it happens, it also uses
[chai](https://www.chaijs.com/)--which works with mocha--and
[chai-http](https://www.chaijs.com/plugins/chai-http/) for mocking HTTP
requests.)

There's nothing wrong with just running the tests on your machine, outside any
containers--you don't have to _always_ use Docker for development. And for a
good amount of development it's easy and fast. But keep in mind that whether the
tests pass on your machine, using your version of Node and your versions of the
`npm` packages, **is not the final word** on whether the application works as it
should. The only thing that matters, in the end, is whether **the application
works as it should when run in the Docker container**. So it's usually worth
waiting an extra few seconds per iteration to wait for the Docker container to
spin up, especially now that you know how to mount your application directory
directly inside it.

So you will definitely need to be able to rebuild the Docker container at some
point. Is there a way that's easier than finding the built container, deleting
it, then re-running the test script? As it happens, there is, by changing the
test script. Copy the test script to one with a different name:
```
cp run_tests.sh run_tests_iter.sh
```
Then edit `run_tests_iter.sh` by replacing this command:
```
docker-compose -f docker-compose.test.yml up
```
with this one:
```
docker-compose -f docker-compose.test.yml up --rebuild
```
If you then run `run_tests_iter.sh` instead of `run_tests.sh` it will rebuild the
Docker container every time.
