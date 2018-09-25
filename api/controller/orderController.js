var orderDao = require('./../dao/orderDao');
var csv = require('csv');

function _create(req, res) {
  function callBackOk(lista) { res.status(200).send(lista); }
  function callBackError(error) { res.status(500).send(error); }
  let params = [
    req.body.name,
    req.body.description,
    req.body.count,
  ];
  orderDao.create(params, callBackOk, callBackError);
}

function _read(req, res) {
  function callBackOk(lista) { res.status(200).send(lista); }
  function callBackError(error) { res.status(500).send(error); }
  orderDao.read(callBackOk, callBackError);
}

function _update(req, res) {
  function callBackOk(lista) { res.status(200).send(lista); }
  function callBackError(error) { res.status(500).send(error); }
  let params = [
    req.body.name,
    req.body.description,
    req.body.count,
    req.params.id
  ];
  orderDao.update(params, callBackOk, callBackError);
}

function _delete(req, res) {
  function callBackOk(lista) { res.status(200).send(lista); }
  function callBackError(error) { res.status(500).send(error); }
  let params = [
    req.params.id
  ];
  orderDao.delete(params, callBackOk, callBackError);
}

function _import(req, res) {
  function callBackOk(lista) { res.status(200).send(lista); }
  function callBackError(error) { res.status(500).send(error); }

  let dataCsv = [];
  csv.parse(req.file.buffer, { columns: true })
    .on('data', function (element) {
      let temporal = {
        procedure: 'INSERT INTO orders(name, description, count) values($1, $2, $3)',
        parameters: [element.name, element.description, element.count]
      };
      dataCsv.push(temporal);
    })
    .on('end', function () {
      orderDao.import(dataCsv, callBackOk, callBackError);
    })
    .on('error', function (error) {
      res.status(500).send(error);
    });
}

exports.create = _create;
exports.read = _read;
exports.update = _update;
exports.delete = _delete;
exports.import = _import;