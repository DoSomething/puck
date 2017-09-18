const assert = require('chai').assert;
const isValid = require('../lib/validator');

describe('Validates data', function() {
  it ('should not validate an object with a bad key', function() {
    const invalidObject = {
      test: 'this will fail',
      event: {},
      meta: {},
      user: {},
      page: {},
      browser: {},
      data: {},
    };

    assert.isFalse(isValid(invalidObject));
  });

  it ('should not validate an object missing keys', function() {
    const invalidObject = {
      event: {},
      meta: {},
      user: {},
      page: {},
      browser: {},
    };

    assert.isFalse(isValid(invalidObject));
  });

  it ('should not validate an object over 4000 bytes', function() {
    const largeObject = new Array(4000).join('0').split('');

    const invalidObject = {
      event: {},
      meta: {},
      user: {},
      page: {},
      browser: {},
      data: largeObject,
    };

    assert.isFalse(isValid(invalidObject));
  });

  it ('should validate an object with proper keys & size limit', function() {
    const validObject = {
      event: {},
      meta: {},
      user: {},
      page: {},
      browser: {},
      data: {},
    };

    assert.isTrue(isValid(validObject));
  });
});
