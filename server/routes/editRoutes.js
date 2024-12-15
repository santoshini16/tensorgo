const express = require('express');
const { deleteRequest } = require('../controllers/editController');

const router = express.Router();


router.delete('/:requestId', deleteRequest); 

module.exports = router;
