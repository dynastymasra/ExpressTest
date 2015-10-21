var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var jsonParser = bodyParser.json();
var connectionString = process.env.DATABASE_URL;

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('asdasdadas', path.join(__dirname, '../', '../', 'config'));
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/api/v1/read/todo', function(req, res) {
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});
    }

    var query = client.query("SELECT * FROM EX_PRAC ORDER BY PRAC_TITLE ASC");
    query.on('row', function(row) {
      results.push(row)
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.post('/api/v1/create/todo', jsonParser, function(req, res) {
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error(err);
      return res.status(500).json({success: false, error: err});
    }

    client.query("INSERT INTO EX_PRAC(PRAC_ID, PRAC_TITLE, PRAC_DESC, PRAC_STATUS) VALUES($1, $2, $3, $4)",
    [req.body.id, req.body.title, req.body.description, req.body.status], function(err) {
      if (err) {
        console.error('could not insert data', err);
        return res.json({success: false, error: err});
      }
    });

    var query = client.query("SELECT * FROM EX_PRAC ORDER BY PRAC_TITLE ASC");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.put('/api/v1/update', function(req, res) {
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error('update data failed', err);
      return res.status(500).send(json({success: false, error: err}));
    }

    client.query("UPDATE EX_PRAC SET PRAC_TITLE=($2), PRAC_DESC=($3), PRAC_STATUS=($4) WHERE PRAC_ID=($1)",
    [req.body.id, req.body.title, req.body.desc, req.body.status], function(err) {
      if (err) {
        done();
        console.error('update data failed', err);
        return res.status(500).send(json({success: false, error: err}));
      }
    });

    var query = client.query("SELECT * FROM EX_PRAC ORDER BY PRAC_TITLE ASC");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.delete('/api/v1/delete/todo/:ex_id', function(req, res) {
  var results = [];
  var id = req.params.ex_id;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error('delete data failed', err);
      return res.status(500).json({success: false, error: err});
    }

    client.query("DELETE FROM EX_PRAC WHERE PRAC_ID=($1)", [id], function(err) {
      if (err) {
        console.error('delete data failed', err);
        return res.status(500).json({success: false, errpr: err});
      }

      var query = client.query("SELECT * FROM EX_PRAC ORDER BY PRAC_TITLE ASC");
      query.on('row', function(row) {
        results.push(row);
      });
      query.on('end', function() {
        done();
        return res.json(results);
      });
    });
  });
});

router.get('/backlog', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'backlog.html'));
});

router.get('/api/v1/read/user', function(req, res) {
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});
    }

    var query = client.query("SELECT * FROM EX_USER ORDER BY USER_NAME ASC;");
    query.on('row', function(row) {
      results.push(row)
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.post('/api/v1/create/user', jsonParser, function(req, res) {
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error(err);
      return res.status(500).json({success: false, error: err});
    }

    client.query("INSERT INTO EX_USER(USER_ID, USER_NO, USER_NAME, USER_EMAIL, USER_PHONE) VALUES($1, $2, $3, $4, $5)",
    [req.body.idUser, req.body.idNo, req.body.name, req.body.email, req.body.phone], function(err) {
      if (err) {
        console.error('could not insert data', err);
        return res.json({success: false, error: err});
      }
    });

    var query = client.query("SELECT * FROM EX_USER ORDER BY USER_NAME ASC");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.put('/api/v1/update/user', function(req, res) {
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error('update data failed', err);
      return res.status(500).send(json({success: false, error: err}));
    }

    client.query("UPDATE EX_USER SET USER_NO=($2), USER_NAME=($3), USER_EMAIL=($4), USER_PHONE=($5) WHERE USER_ID=($1)",
    [req.body.idUser, req.body.idNo, req.body.name, req.body.email, req.body.phone], function(err) {
      if (err) {
        done();
        console.error('update data failed', err);
        return res.status(500).send(json({success: false, error: err}));
      }
    });

    var query = client.query("SELECT * FROM EX_USER ORDER BY USER_NAME ASC");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.delete('/api/v1/delete/user/:ex_id_user', function(req, res) {
  var results = [];
  var id = req.params.ex_id_user;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error('delete data failed', err);
      return res.status(500).json({success: false, error: err});
    }

    client.query("DELETE FROM EX_USER WHERE USER_ID=($1)", [id], function(err) {
      if (err) {
        console.error('delete data failed', err);
        return res.status(500).json({success: false, errpr: err});
      }

      var query = client.query("SELECT * FROM EX_USER ORDER BY USER_NAME ASC");
      query.on('row', function(row) {
        results.push(row);
      });
      query.on('end', function() {
        done();
        return res.json(results);
      });
    });
  });
});

module.exports = router;
