const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api',dashboardRoutes);
app.use('/api',userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('MongoDB Connected'))
    .catch(err =>console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));