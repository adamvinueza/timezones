# timezones

A simple REST API for managing dates and times with time zones.

This app is an exercise for practicing the red-green-refactor pattern in
test-driven development (TDD). It will also give you practice in a number of
widely-used technologies, such as Node, Express, and Docker.

You will need to install [Docker](https://hub.docker.com/?overlay=onboarding) so
that you can run Docker tools on your machine.

Also, you should download and install a relatively recent version of
[NodeJS](https://nodejs.org/en/download/). This way it'll be easier to diagnose
and debug issues independently of Docker.

Installing NodeJS will also install the `npm` tool, which you can use to install
packages that enable your application to run.

## Quick start

Install Node. If you're using OS X, you might as well get started using Homebrew
if you haven't already:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Then run:
```
brew install node
```
If you're using Linux or Windows, use the [Node download
site](https://nodejs.org/en/download/) and follow the instructions.

If you don't have a place where you keep all your git repositories, use ~/git:
```
mkdir ~/git
```

Navigate to the directory where you'll be installing the repository and
[fork](https://guides.github.com/activities/forking/) it. Then you can do this:
```
cd ~/git/timezones
npm install && node server.js
```
That should start the application. Open a browser, then enter this URL:
```
http://localhost:3000
```
You should see this:
```
Hello, World!
```
If you see that, congratulations! Your application works.

# The task

The timezones application exposes the following two REST endpoints:
```
===============
GET /local-time
===============

http://localhost:3000/local-time?tz=TZ_NAME

  Gets the current time localized to the specified time zone, as an ISO-8601
  formatted string. If none is provided, the time returned is localized to
  Universal Time Coordinated (UTC). If an invalid time zone is provided, the
  string returned should be "Invalid time zone: " followed by the time zone
  provided.

PARAMETERS:

  TZ_NAME  A valid TZ database name

=================
GET /convert-time
=================

http://localhost:3000/convert-time?time=ISO_8601_TIME&tz=TZ_NAME

  Gets the specified ISO 8601 formatted datetime string and returns an ISO-
  8601 formatted string representing that time in the specified time zone.
  formatted string. If no time is provided, the current time is used. If no
  time zone is provided, the time returned is localized to UTC. If an invalid
  time zone is provided, the string returned should be "Invalid time zone: "
  followed by the time zone provided.

PARAMETERS:

  ISO_8601_TIME  A valid ISO-8601 formatted datetime string
  TZ_NAME        A valid TZ database name
```

The application source code contains `localTime` and `convertTime` directories,
whose files handle the routes documented above. The `/local-time` endpoint is
handled correctly, and has tests written. You should examine the files in the
`localTime` directory, and the tests in the `test` directory, as a guide to
fixing the code in the `convertTime` directory. Try to follow the RGR procedure
to get the tests to pass and clean up your code.  Write each test _first_; it
will of course fail given the function as written.

Pay attention to how the files in `localTime` are organized and consider why
they have been written in that way. Contrast them to the file in `convertTime`.
Is it easier or harder to write tests for one or the other case? Why?

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
