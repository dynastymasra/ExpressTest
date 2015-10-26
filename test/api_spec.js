var frisby = require('frisby');

frisby.create('Must back json value todo').get('http://localhost:3000/api/v1/read/todo').expectStatus(200)
  .expectHeaderContains('content-type', 'application/json').inspectJSON().toss();
