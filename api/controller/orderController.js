var orderDao = require('./../dao/orderDao');

function _create(req, res) {
  function callBackOk(lista) { res.status(200).send(lista) }
  function callBackError(error) { res.status(404).send(error) }
  let params = [
    req.body.name,
    req.body.description
  ];
  orderDao.create(params, callBackOk, callBackError);
}

function _read(req, res) {
  function callBackOk(lista) { res.status(200).send(lista) }
  function callBackError(error) { res.status(404).send(error) }
  orderDao.read(callBackOk, callBackError);
}

function _update(req, res) {
  function callBackOk(lista) { res.status(200).send(lista) }
  function callBackError(error) { res.status(404).send(error) }
  let params = [
    req.body.name,
    req.body.description,
    req.params.id
  ];
  orderDao.update(params, callBackOk, callBackError);
}

function _delete(req, res) {
  function callBackOk(lista) { res.status(200).send(lista) }
  function callBackError(error) { res.status(404).send(error) }
  let params = [
    req.params.id
  ];
  orderDao.delete(params, callBackOk, callBackError);
}

exports.create = _create;
exports.read = _read;
exports.update = _update;
exports.delete = _delete;