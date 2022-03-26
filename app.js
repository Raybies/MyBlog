const path = require('path');

const express = require('express');

const blogRoutes = require('./routes/blog');

// import database.js util file
const db = require('./data/database');

const app = express();

// Activate EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static('public')); // Serve static files (e.g. CSS files)

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render('500');
});

// connect to db using the exported function from ./data/database.js
db.connectToDatabase().then(function(){
  // app.listen (e.g. webserver) only started once the database connection is made
  app.listen(3000);
});


