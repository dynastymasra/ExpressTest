var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

var client = new pg.Client(connectionString);
client.connect(function(err) {
  if (err) {
    return console.error('could not connect to database', err);
  }

  client.query('CREATE TABLE EX_PRAC(EX_ID SERIAL PRIMARY KEY, EX_TITLE VARCHAR(255), EX_DESC VARCHAR(255), EX_TO_DO BOOLEAN, EX_PROGRESS BOOLEAN, EX_DONE BOOLEAN)',
  function(err, result) {
      if (err) {
        return console.error('could not create table EX_PRAC', err);
      } else {
        console.log('sucess create table EX_PRAC', result);
        client.end();
      }
  });

  client.query('CREATE TABLE EX_USER(EX_ID_USER SERIAL PRIMARY KEY, EX_ID_NO VARCHAR(255), EX_NAME VARCHAR(255), EX_EMAIL VARCHAR(255), EX_PHONE VARCHAR(255))',
  function(err, result) {
      if (err) {
        return console.error('could not create table EX_USER', err);
      } else {
        console.log('sucess create table EX_USER', result);
        client.end();
      }
  });
});
