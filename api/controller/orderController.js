var orderDao = require('./../dao/orderDao');

function _list(req, res) {
  function callBackOk(lista) {
    res.status(200).send(lista)
  }
  function callBackError(error) {
    res.status(404).send(error)
  }
  orderDao.list(callBackOk, callBackError);
}

function _create(req, res) {
  function callBackOk(lista) {
    res.status(200).send(lista)
  }
  function callBackError(error) {
    res.status(404).send(error)
  }
  let params = [
    req.body.name,
    req.body.description
  ];
  orderDao.create(params, callBackOk, callBackError);
}

exports.list = _list;
exports.create = _create;