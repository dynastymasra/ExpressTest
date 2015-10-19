var assert = require('assert');
var pg = require('pg');

describe('Connection', function() {
  before(function(done) {
    pg.connect(process.env.DATABASE_URL);
    done();
  })
});
