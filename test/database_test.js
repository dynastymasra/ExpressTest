// var should = require('should');
// var assert = require('assert');
// var request = require('supertest');
// var pg = require('pg');
//
// describe('Connection', function() {
//   var url = 'http://localhost:3000';
//   pg.connect(process.env.DATABASE_URL);
//   before(function(done) {
//     done();
//   })
// 
//   describe('Routing', function() {
//     // it('Must return success save data todo', function(done) {
//     //   var todo = {id: 1234567890, title: "Test", description: "Test", status: "Backlog"}
//     //
//     //   request(url).post('/api/v1/create/todo').send(todo).end(function(err, res) {
//     //     if (err) {
//     //       throw err
//     //     }
//     //     res.should.have.status(200)
//     //     done();
//     //   });
//     // });
//
//     it('Must return success update data todo', function(done) {
//       var todo = {id: 1234567890, title: "Update", desc: "Update", status: "Done"}
//
//       request(url).put('/api/v1/update/todo').send(todo).expect('Content-Type', /json/).expect(200).end(function(err, res) {
//         if (err) {
//           throw err;
//         }
//         // res.body.should.have.property('id');
// 	      res.body.title.should.equal('Update');
// 	      res.body.desc.should.equal('Update');
// 	      res.body.status.should.equal('Done');
// 			 done();
//       });
//     });
//   });
// });
