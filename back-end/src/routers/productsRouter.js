const { Router } = require('express');
const productsController = require('../controllers/productsController');

const router = Router();

router.get('/', productsController.list);

module.exports = router;