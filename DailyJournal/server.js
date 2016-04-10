'use strict'

var express = require('express');
var Promise = require('bluebird');
var app = express();

var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var uploadDir = 'uploads';
var upload = multer({ dest: uploadDir });

app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
// Do not forget this fucking static handler!
app.use('/directives', express.static('directives'));
app.use('/partials', express.static('partials'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Database settings
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dailyjournal');

var postSchema = mongoose.Schema({
  title: String,
  body: String,
  file: String,
  date: Date,
  favorite: Boolean,
  tags: [String]
});
var Post = mongoose.model('Post', postSchema);

/**
 * Routes
 */
app.get('/posts', function(req, res) {
  Post.find().exec().then(function(posts) {
    res.json(posts);
  });
});

app.get('/posts/:id', function(req, res) {
  Post.findOne({ _id: req.params.id }).then(function(post) {
    res.json(post);
  });
});

app.post('/posts', function(req, res) {
  var newPost = new Post(req.body);
  newPost.save().then(function(saved) {
    res.json(saved);
  })
});

app.put('/posts/:id', function(req, res) {
  console.log('updating: ', req.params,req.body);
  Post.findOneAndUpdate({ _id: req.params.id }, req.body).exec()
  .then(function(r) {
    res.json(r);
  });
});

app.patch('/posts/:id/attatch', upload.single('attach'), function(req, res) {
  console.log(req.file);
  var file = path.join(uploadDir, req.file.filename);
  Post.findOneAndUpdate({ _id: req.params.id }, { file: file }).exec()
  .then(function(r) {
    res.json(r);
  });

})

app.delete('/posts/:id', function(req, res) {
  console.log('deleting ', req.params.id);
  Post.findOneAndRemove({ _id: req.params.id }).exec().then(function(d) {
    res.json(d);
  })
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000);
