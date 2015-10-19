var express = require('express');
var pg = require('pg');
var router = express.Router();
var connectionString = process.env.DATABASE_URL;

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('asdasdadas', path.join(__dirname, '../', '../', 'config'));
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/read', function(req, res) {
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});
    }

    var query = client.query("SELECT * FROM EX_PRAC;");
    query.on('row', function(row) {
      results.push(row)
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.post('/api/v1/create/:ex_id/:ex_title/:ex_desc/:ex_to_do/:ex_progress/:ex_done', function(req, res) {
  var results = [];
  var data = {id: req.params.ex_id, title: req.params.ex_title, desc: req.params.ex_desc, todo: req.params.ex_to_do, progress: req.params.ex_progress, done: req.params.ex_done};

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error(err);
      return res.status(500).json({success: false, error: err});
    }

    client.query("INSERT INTO EX_PRAC(EX_ID, EX_TITLE, EX_DESC, EX_TO_DO, EX_PROGRESS, EX_DONE) VALUES($1, $2, $3, $4, $5, $6)", [data.id, data.title, data.desc, data.todo, data.progress, data.done], function(err) {
      if (err) {
        console.error('could not insert data', err);
        return res.json({success: false, error: err});
      }
    });

    var query = client.query("SELECT * FROM EX_PRAC");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.put('/api/v1/update/:ex_id/:ex_title/:ex_desc/:ex_to_do/:ex_progress/:ex_done', function(req, res) {
  var results = [];
  var data = {id: req.params.ex_id, title: req.params.ex_title, desc: req.params.ex_desc, todo: req.params.ex_to_do, progress: req.params.ex_progress, done: req.params.ex_done};

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error('update data failed', err);
      return res.status(500).send(json({success: false, error: err}));
    }

    client.query("UPDATE EX_PRAC SET EX_TITLE=($2), EX_DESC=($3), EX_TO_DO=($4), EX_PROGRESS=($5), EX_DONE=($6) WHERE EX_ID=($1)", [data.id, data.title, data.desc, data.todo, data.progress, data.done], function(err) {
      if (err) {
        done();
        console.error('update data failed', err);
        return res.status(500).send(json({success: false, error: err}));
      }
    });

    var query = client.query("SELECT * FROM EX_PRAC");
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.delete('/api/v1/delete/:ex_id', function(req, res) {
  var results = [];
  var id = req.params.ex_id;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      console.error('delete data failed', err);
      return res.status(500).json({success: false, error: err});
    }

    client.query("DELETE FROM EX_PRAC WHERE EX_ID=($1)", [id], function(err) {
      if (err) {
        console.error('delete data failed', err);
        return res.status(500).json({success: false, errpr: err});
      }

      var query = client.query("SELECT * FROM EX_PRAC");
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
