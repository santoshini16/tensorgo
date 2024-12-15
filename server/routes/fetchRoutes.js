const express = require('express');
const { fetchRequests } = require('../controllers/fetchController');
const Router = express.Router();

Router.get('/posts',fetchRequests)

module.exports = Router