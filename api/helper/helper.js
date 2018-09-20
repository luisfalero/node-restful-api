const { Pool, Client } = require('pg');
const config = require('./config');

const pool = new Pool(config.connectionData);

function _query(procedure, parameters, callBackOk, callBackError) {
  pool.connect(function (err, client, done) {
    if (err) {
      let messageError = {
        message: 'Error in the connection with the database',
        query: err
      }
      callBackError(messageError);
    }
    client.query(procedure, parameters, function (err, result) {
      done(); //call `done()` to release the client back to the pool
      if (err) {
        let messageError = {
          message: 'Error in the query to the database',
          query: err
        }
        callBackError(messageError);
      }
      callBackOk(result.rows);
    });
  });
};

async function _transaction(procedures, callBackOk, callBackError) {
  const client = await pool.connect();
  try {
    let error = null;
    const handleError = e => error = error || e;

    let querys = [];
    querys.push(client.query('BEGIN').catch(handleError));
    procedures.forEach(element => {
      let procedure = element.procedure;
      let parameters = element.parameters;
      querys.push(client.query(procedure, parameters).catch(handleError));
    });
    querys.push(client.query('COMMIT').catch(handleError));
    await Promise.all(querys);
    if (error) {
      let messageError = {
        message: 'Error in the transaction to the database',
        query: error
      }
      callBackError(messageError);
    };
  } finally {
    client.release();
    callBackOk([]);
  }
}

exports.query = _query;
exports.transaction = _transaction;