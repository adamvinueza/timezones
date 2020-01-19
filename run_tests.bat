echo off
:: Runs unit tests for timezones app
docker-compose -f docker-compose.test.yml up 
docker-compose down
