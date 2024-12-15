const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../utils/googleConfig');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');


const googleAuth = async (req, res, next) => {
    const code = req.query.code;
    try {
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { email, name} = userRes.data;
        
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                password: 'picture',
            });
        }
        const { _id } = user;
        const token = jwt.sign({ _id, email },
            process.env.JWT_PRIVATE_KEY, {
            expiresIn: process.env.JWT_TIMEOUT,
        });
        res.status(200).json({
            message: 'success',
            token,
            user,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    
    const jwtToken = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'Registration successful',
      token: jwtToken,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    const isPasswordValid = user.password && (await bcrypt.compare(password, user.password));
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

   
    const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '2h',
    });

    res.status(200).json({
      message: 'Login successful',
      token: jwtToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

module.exports = { googleAuth, register, login };
