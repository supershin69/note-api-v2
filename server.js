const express = require('express');
const cookieParser = require('cookie-parser');
const dbConnector = require('./utils/dbConnector');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dbConnector();

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})