const express = require('express');
const router = express.Router();

const occurrenceRoutes = require('./occurrenceRoutes');
const authRoutes = require('./authRoutes');

router.use('/ocorrencias', occurrenceRoutes);
router.use('/auth', authRoutes);

module.exports = router;

