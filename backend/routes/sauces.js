const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multer, saucesCtrl.createProduct);
router.put('/:id', auth, multer, saucesCtrl.modifyProduct);
router.delete('/:id', auth, saucesCtrl.deleteProduct);
router.get('/:id', auth, saucesCtrl.getOneProduct);
router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;