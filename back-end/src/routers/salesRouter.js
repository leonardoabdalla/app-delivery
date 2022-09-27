const { Router } = require('express');
const salesController = require('../controllers/salesController');

const router = Router();

router.post('/', salesController.create);
router.get('/', salesController.list);
router.get('/:id', salesController.getById);

module.exports = router;