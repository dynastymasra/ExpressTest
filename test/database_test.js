var assert = require('assert');
var pg = require('pg');

describe('Connection', function() {
  var url = 'http://localhost:3000';
  pg.connect(process.env.DATABASE_URL);
  before(function(done) {
    done();
  })

  // it('respond with matching records', function() {
  //   return db.find({ type: 'User' }).should.eventually.have.length(3);
  // });
  // it('should return -1 when the value is not present', function () {
  //    assert.equal(-1, [1,2,3].indexOf(5));
  //    assert.equal(-1, [1,2,3].indexOf(0));
  //  });
});
