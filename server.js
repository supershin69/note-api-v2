const express = require('express');
const cookieParser = require('cookie-parser');
const dbConnector = require('./utils/dbConnector');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const morgan = require('morgan');
const cors = require('cors');
const { authRateLimit, requestRateLimit } = require('./middlewares/rateLimiters');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
dbConnector();

app.use('/api/auth', authRateLimit, authRoutes);
app.use('/api/notes', requestRateLimit, noteRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})