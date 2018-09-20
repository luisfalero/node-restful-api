var helper = require('./../helper/helper');

function _list(callBackOk, callBackError) {
  let procedure = 'SELECT * from orders';
  helper.query(procedure, [], callBackOk, callBackError);
}

function _create(params, callBackOk, callBackError) {
  let procedure = 'INSERT INTO orders(name, description) values($1, $2)';
  helper.query(procedure, params, callBackOk, callBackError);
}

exports.list = _list;
exports.create = _create;