const express = require('express');
const router = express.Router();
const orderController = require('./../controller/orderController');

router.post('/', orderController.create);
router.get('/', orderController.read);
router.put('/:id', orderController.update);
router.delete('/:id', orderController.delete);

module.exports = router;