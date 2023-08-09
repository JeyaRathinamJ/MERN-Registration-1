require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB'); // Add this line to log a successful connection
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error); // Add this line to log any connection errors
  });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    console.log('New user registered:', newUser); // Add this line to log the newly registered user
    res.json(newUser);
  } catch (error) {
    console.error('Registration failed:', error); // Add this line to log any registration errors
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
