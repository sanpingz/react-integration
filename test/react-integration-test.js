/*globals describe, it */
/*jshint maxstatements:false */
'use strict';

var assert = require('assert');
var integration = require('../lib/react-integration');

describe('react-integration', function () {
  it('returns a function', function () {
    assert.equal(typeof integration, 'function');
  });
});
