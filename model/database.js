var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

var client = new pg.Client(connectionString);
client.connect(function(err) {
  if (err) {
    return console.error('could not connect to database', err);
  }

  client.query('CREATE TABLE EX_PRAC(PRAC_ID SERIAL PRIMARY KEY, PRAC_TITLE VARCHAR(255), PRAC_DESC VARCHAR(255), PRAC_STATUS VARCHAR(255))',
  function(err, result) {
      if (err) {
        return console.error('could not create table EX_PRAC', err);
      } else {
        console.log('sucess create table EX_PRAC', result);
        client.end();
      }
  });

  client.query('CREATE TABLE EX_USER(USER_ID SERIAL PRIMARY KEY, USER_NO VARCHAR(255), USER_NAME VARCHAR(255), USER_EMAIL VARCHAR(255), USER_PHONE VARCHAR(255))',
  function(err, result) {
      if (err) {
        return console.error('could not create table EX_USER', err);
      } else {
        console.log('sucess create table EX_USER', result);
        client.end();
      }
  });

  client.query('CREATE TABLE EX_STATUS(STATUS_PRAC_ID INT, STATUC_USER_ID INT)',
  function(err, result) {
      if (err) {
        return console.error('could not create table EX_STATUS', err);
      } else {
        console.log('sucess create table EX_STATUS', result);
        client.end();
      }
  });
});
