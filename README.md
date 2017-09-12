# Puck

Puck accepts a websocket connection from web apps using the Puck client. It validates events the events sent to it, applies necessary transformations, and forwards the data off to all of the places it needs to be tracked. Currently that is Keen.io, Blink, and a backup database.

## Usage

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
    path: '', # The current path of where this event was fired
    referrer: '', # The previous page
    landing_ts: '', # The timestamp of the first page land in this session
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
