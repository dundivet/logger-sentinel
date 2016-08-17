var
    //SymfonyLogs = require('../models/symfonylogs'),
    router = require('express').Router();
    controller = require('../controllers/symfonylogs-controller');

router.get('/', controller.findAllSymfonyLogs);
router.get('/:id', controller.findById);
router.post('/', controller.addSymfonyLog);
router.put('/:id', controller.updateSymfonyLog);
router.delete('/:id', controller.deleteSymfonyLog);

module.exports = router;