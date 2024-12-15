const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log("Token received:", req.headers['authorization']); 
  try {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    const token = authHeader.split(' ')[1]; 
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    console.log('decoded...',decoded);
    req.user = decoded;
    console.log("Before next() in authMiddleware");
next();
console.log("After next() in authMiddleware");

  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
