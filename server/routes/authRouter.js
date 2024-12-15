const express = require('express');
const Router = express.Router();
const { googleAuth,register, login } = require('../controllers/authController');

Router.get("/google", googleAuth);
Router.post('/register', register);
Router.post('/login', login);

module.exports = Router;