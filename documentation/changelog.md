## Spec changelog

### 1.3.0
Moving the setting of the uuid on the `meta` property from the client to the server.

### 1.2.0
Added a uuid to the `meta` property.

### 1.1.0
Added users `ip` to help with cross domain tracking. Note: Due to the fact the IP is added server side and deployments happening asynchronous, there is going to be a small disrepency between events that have the IP and the 1.1.0 spec version.
