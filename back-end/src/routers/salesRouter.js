const { Router } = require('express');
const salesController = require('../controllers/salesController');

const router = Router();

router.post('/', salesController.create);
router.get('/', salesController.list);
router.get('/:id', salesController.getById);
router.put('/:id', salesController.updateStatus);

module.exports = router;