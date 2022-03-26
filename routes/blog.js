const express = require('express');

// add to get access to database server
const mongodb = require('mongodb');

// import the db file for use in this file
const db = require('../data/database');

// to get the ObjectID in the proper type formatted
const ObjectID = mongodb.ObjectId;

const router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/posts');
});

router.get('/posts', function(req, res) {
  res.render('posts-list');
});

router.get('/new-post', async function(req, res) {
  /* 
    call the getDb function to get access to the database collection  this establishes access
    documentsCursor pointing at the documents, to move through the documents that were fetched--good for large documents to work
    with them in chunks
  */
  const authors = await db.getDb().collection('authors').find().toArray(); //after the collection we can start using the same syntax as in the mongodb i.e. find()
  // .toArray to get the database data as a javascript object in properly formatted key:value pairs
  res.render('create-post', { authors: authors}); //author before : is a name we give to use in the page code, the author after : is the const authors variable above

});

// route to handle the incoming data to be stored in the database
router.post('/posts', async function(req, res){
  //make a variable to store the  ObjectId from the blog post
  const authorId = new ObjectID(req.body.author);
  // search (filter) for the name by looking up the ObjectId from the blog post to get the Human Name from the db
  const author = await db.getDb().collection('authors').findOne({ _id: authorId }); //this makes the whole authors collection available 
  
  // extract incoming data from the create-posts post
  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(), //give the current time and date when the function is called
    author: {
      id: authorId, //variable made above based on quarry
      name: author.name, //from the database
      email: author.email //from the database
    }
  };
  const result = await db.getDb().collection('posts').insertOne(newPost);
  console.log(result);
  //response is to go back to the /post page to see all blog posts
  res.redirect('/posts');
});

module.exports = router;