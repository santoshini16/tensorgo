const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRouter');
const requestRoutes = require('./routes/requestRoutes');
const fetchRoutes = require('./routes/fetchRoutes');
const editRoutes = require('./routes/editRoutes')
const PORT = process.env.PORT || 3000;

if (!process.env.MONGO_URL) {
    console.error('MONGO_URL is not defined in the environment variables');
    process.exit(1);
}

app.use(cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.options('*', cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.path);
    next();
  });

app.use('/auth/', authRoutes); 
app.use('/requests', requestRoutes);
app.use('/',fetchRoutes) ;
app.use('/api',editRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});


process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log('MongoDB disconnected on app termination');
    process.exit(0);
});


  

app.use((err, req, res, next) => {
    console.error("Global error handler caught:", err.message);
    res.status(500).json({ message: "An unexpected error occurred" });
  });

 
  

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})