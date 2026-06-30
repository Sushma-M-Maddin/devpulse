
require('dotenv').config(); //Loads the .env variables
const express = require('express');  //creating the varaible that cannot be reassigned

const userRoutes = require('./routes/userRoutes');
const repoRoutes = require('./routes/repoRoutes');
const compareRoutes = require('./routes/compareRoutes');
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/historyRoutes');


const app = express(); //creating the express application which will be stpred in app.
const PORT = process.env.PORT || 3000; //Logical OR => use left value if not available use right value

app.use(express.json()); //Translator => express won't understand JSON so that's why

// Register routes — /api/user/:username is the full path
app.use('/api/user', userRoutes);
app.use('/api/repo', repoRoutes);
app.use('/api/compare',compareRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/history', historyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

