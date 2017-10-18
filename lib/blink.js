const stathat = require('../util/stathat');
const request = require('superagent');
const blinkUri = process.env.BLINK_URI;
const blinkKey = process.env.BLINK_API_KEY;

function makeBlinkRequest(data) {
  request()
    .post(blinkUri)
    .set('Content-type', 'application/json')
    .set('Authorization', `Basic ${blinkKey}`)
    .send(data)
    .end(res => {
      if (res.status !== '200') {
        stathat.count('blink request failed');
      }
    })
}

module.exports.write = (data) => {
  if (! blinkUri || ! blinkKey) {
    return;
  }

  makeBlinkRequest(data);
};
