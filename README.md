# Puck

Puck is a service that accepts a websocket connection from web apps using the Puck client. It validates events the events sent to it, applies necessary transformations, and forwards the data off to all of the places it needs to be tracked. Currently that is Keen.io, Blink, and a backup database.

## Usage

This app uses the Heroku runtime, get the Heroku toolbelt [here](https://devcenter.heroku.com/articles/heroku-cli#macos) if you don't already have it.

```
$ cp .env.example .env
$ npm install
$ npm start
```

:warning: This requires `mongod` installed locally if you want to test the database backup.

## Data model

This is the data model that is expected by Puck.

```
{
  event: {
    name: '', # Name of the event "signup"
    source: '', # Where is this coming from? Phoenix Ashes, Next?
  },
  meta: {
    timestamp: '', # Timestamp of when the event was created
    version: '', # If we make a breaking spec change, this number will increment
  },
  user: {
    deviceId: '', # UUID that is assigned to the device and doesn't change
    northstarId: '', # If the user authenticates, add the Northstar id
  },
  page: {
    href: 'http://foo.bar/the/path?test=1',
    host: 'foo.bar',
    path: '/the/path',
    query: {
      test: '1',
    },
    referrer: { # This persists for the entire session
      href: 'http://hello.world/blah/blah?stuff=dsfdsf',
      host: 'hello.world',
      path: '/blah/blah',
      query: {
        stuff: 'dsfdsf',
      },
    },
    landingTimestamp: 12324654765,
    sessionId: 12324654765fdsfdsfdsfsdsd,
  },
  device: {
    size: 'small',
  },
  data: {
    anything: {
      we: {
        want: '',
      }
    }
  },
}
```

## Testing

If you want to simulate a socket connection, this is a useful tool
http://amritb.github.io/socketio-client-tool

Otherwise use `npm run test` for automated testing.
