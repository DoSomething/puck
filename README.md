# Puck

This file is a mess, project WIP

http://amritb.github.io/socketio-client-tool

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
