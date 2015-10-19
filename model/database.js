var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

var client = new pg.Client(connectionString);
client.connect(function(err) {
  if (err) {
    return console.error('could not connect to database', err);
  }

  client.query('CREATE TABLE EX_PRAC(EX_ID SERIAL PRIMARY KEY, EX_TITLE VARCHAR(255), EX_DESC VARCHAR(255), EX_TO_DO BOOLEAN, EX_PROGRESS BOOLEAN, EX_DONE BOOLEAN)', function(err, result) {
      if (err) {
        return console.error('could not create table SC_EXPRESS_PRAC', err);
      }
      console.log('sucess create table SC_EXPRESS_PRAC', result);
      client.end();
  })
});
