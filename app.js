const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');

dotenv.config();

const passport = require('./middleware/authenticate');
const { specs, swaggerUi } = require('./swagger');
const contactsRouter = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// OAuth routes
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

// Check authentication route
app.get('/auth/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Login route
app.get('/login', (req, res) => {
  res.redirect('/auth/github');
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      res.redirect('/');
    });
  });
});

// Redirect root URL to API documentation
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Apply the ensureAuthenticated middleware to protect create, update, and delete routes
app.use('/contacts', ensureAuthenticated, contactsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
