// app.js

const express = require('express');
const mongoose = require('mongoose');
const { specs, swaggerUi } = require('./swagger');
const contactsRouter = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 3000; // Ensure port is set correctly

// Middleware
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/contacts', contactsRouter);

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://anthmorera:FjT4cu5OaPYyP8sk@cluster0.hq4fazp.mongodb.net/project2';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Redirect root URL to API documentation
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
