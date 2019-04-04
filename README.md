# Puck

Puck is a service that accepts a websocket connection from web apps using the Puck client. It validates events the events sent to it, applies necessary transformations, and forwards the data off to all of the places it needs to be tracked. Currently that is Blink and a mongodb database.

## Usage

This app uses the Heroku runtime, get the Heroku toolbelt [here](https://devcenter.heroku.com/articles/heroku-cli#macos) if you don't already have it.

```
$ cp .env.example .env
$ npm install
$ npm start
```

:warning: This requires `mongod` installed locally if you want to test the database backup.

## Testing

If you want to simulate a socket connection, this is a useful tool
http://amritb.github.io/socketio-client-tool

Otherwise use `npm run test` for automated testing.
