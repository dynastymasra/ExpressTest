var supertest = require("supertest");
var should = require("should");

var server = supertest.agent('http://localhost:3000')

describe('Test API GET', function() {
  it('GET API todo data', function(done) {
    server.get('/api/v1/read/todo').expect("Content-type", /json/).expect(200).end(function(err, res) {
      res.status.should.equal(200);
      done()
    })
  })

  it('GET API user data', function(done) {
    server.get('/api/v1/read/user').expect("Content-type", /json/).expect(200).end(function(err, res) {
      res.status.should.equal(200)
      done()
    })
  })
})

describe('Test API POST', function() {
  var todo = {"id": 1234567890, "title": "Test", "description": "Test", "status": "backlog"}
  var user = {"idUser": 1234567890, "idNo":"Test", "name":"Test", "email":"Test", "phone":"Test"}

  it('POST API todo save data', function(done) {
    server.post('/api/v1/create/todo').send(todo).expect("Content-type", /json/).expect(200).end(function(err, res) {
      res.status.should.equal(200)
      done()
    })
  })

  it('POST API user save data', function(done) {
    server.post('/api/v1/create/user').send(user).expect("Content-type", /json/).expect(200).end(function(err, res) {
      res.status.should.equal(200)
      done()
    })
  })
})

describe('Test API PUT', function() {
  var todo = {"id": 1234567890, "title": "Update", "desc": "Update", "status": "Done"}
  var user = {"idUser": 1234567890, "idNo":"Update", "name":"Update", "email":"Update", "phone":"Update"}

  it('POST API todo update data', function(done) {
    server.put('/api/v1/update/todo').send(todo).expect("Content-type", /json/).expect(200).end(function(err, res) {
      res.status.should.equal(200)
      done()
    })
  })

  it('POST API user update data', function(done) {
    server.put('/api/v1/update/user').send(user).expect("Content-type", /json/).expect(200).end(function(err, res) {
      done()
      res.status.should.equal(200)
    })
  })
})
