const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const movieRoutes = require('./routes/movieRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;