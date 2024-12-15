const express = require('express');
const { deleteRequest } = require('../controllers/editController');

const router = express.Router();

// DELETE request route
router.delete('/:requestId', deleteRequest); // :requestId is the ID of the request to delete

module.exports = router;
