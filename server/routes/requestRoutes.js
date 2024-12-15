const express = require('express');
const { createRequest, getRequestsByCategory} = require('../controllers/requestController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createRequest);

module.exports = router;
