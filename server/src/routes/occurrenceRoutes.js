const express = require('express');
const router = express.Router();
const occurrenceController = require('../controllers/occurrenceController');

router.get('/stats', occurrenceController.getStats);
router.get('/filtrar', occurrenceController.filterOccurrences);
router.get('/telefone/:telefone', occurrenceController.getOccurrencesByPhone);
router.post('/', occurrenceController.createOccurrence);
router.get('/', occurrenceController.listOccurrences);
router.get('/:id', occurrenceController.getOccurrence);
router.put('/:id', occurrenceController.updateOccurrence);

module.exports = router;

