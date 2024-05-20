// app.js

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./middleware/authenticate'); // Import passport
const { specs, swaggerUi } = require('./swagger');
const contactsRouter = require('./routes/contacts');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/contacts', contactsRouter);

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// OAuth routes
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/contacts');
  }
);

// Redirect root URL to API documentation
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
