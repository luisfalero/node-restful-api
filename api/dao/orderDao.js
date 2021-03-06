var helper = require('./../helper/helper');

function _create(params, callBackOk, callBackError) {
  let procedures = [
    {
      procedure: 'INSERT INTO orders(name, description, count) values($1, $2, $3)',
      parameters: params
    }
  ];
  helper.transaction(procedures, callBackOk, callBackError);
}

function _read(callBackOk, callBackError) {
  let procedure = 'SELECT * from orders';
  helper.query(procedure, [], callBackOk, callBackError);
}

function _update(params, callBackOk, callBackError) {
  let procedures = [
    {
      procedure: 'UPDATE orders set name = $1, description = $2, count = $3 where id = $4',
      parameters: params
    }
  ];
  helper.transaction(procedures, callBackOk, callBackError);
}

function _delete(params, callBackOk, callBackError) {
  let procedures = [
    {
      procedure: 'DELETE from orders where id = $1',
      parameters: params
    }
  ];
  helper.transaction(procedures, callBackOk, callBackError);
}

function _import(procedures, callBackOk, callBackError) {
  helper.transaction(procedures, callBackOk, callBackError);
}

exports.create = _create;
exports.read = _read;
exports.update = _update;
exports.delete = _delete;
exports.import = _import;