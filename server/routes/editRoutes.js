const express = require('express');
const { deleteRequest, updateRequest } = require('../controllers/editController');

const router = express.Router();


router.delete('/:requestId', deleteRequest); 
router.put('/:editId', updateRequest); 

module.exports = router;
