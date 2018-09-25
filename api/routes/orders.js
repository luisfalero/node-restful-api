const express = require('express');
const router = express.Router();
const orderController = require('./../controller/orderController');
const multer  = require('multer');  
let upload  = multer({ storage: multer.memoryStorage() });

router.post('/import', upload.single('path'), orderController.import);
router.post('/', orderController.create);
router.get('/', orderController.read);
router.put('/:id', orderController.update);
router.delete('/:id', orderController.delete);

module.exports = router;