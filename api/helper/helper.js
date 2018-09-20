const { Pool, Client } = require('pg');
const config = require('./config');

const pool = new Pool(config.connectionData);

function query(procedure, parameters, callBackOk, callBackError) {
  pool.connect(function (err, client, done) {
    if (err) {
      callBackError(err);
    }
    client.query(procedure, parameters, function (err, result) {
      done(); //call `done()` to release the client back to the pool
      if (err) {
        callBackError(err);
      }
      callBackOk(result.rows);
    });
  });
};

exports.query = query;