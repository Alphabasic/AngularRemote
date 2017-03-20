const express = require('express');
const router = express.Router();
const Mongo = require('MongoDB').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const conn = 'mongodb://localhost:27017/MightyFine';

/* GET api listing. */
router.get('/', (req, res) => {
  res.status(200);
});

router.get('/posts', (req, res) => {
  Mongo.connect(conn)
    .then( db => db.collection('posts').find().toArray())
    .then( 
        items => res.status(200).json(items), 
        err => res.status(500).send(err)
      );
})

router.get('/posts/:post_id', (req, res) => {
  Mongo.connect(conn)
    .then( db => db.collection('posts').findOne({"_id": new ObjectId(req.params.post_id)}))
    .then( 
      post => res.status(200).send(post), 
      err => res.status(500)
    )
    .catch(err => res.status(500).send(err))
})

router.put('/posts/:post_id', (req, res) => {
  Mongo.connect(conn)
    .then( db => db.collection('posts').update(
        {"_id": new ObjectId(req.params.post_id)},
        {
          title: req.params.title || "",
          body: req.params.body || ""
        },
        { upsert: true }
      ))
})

module.exports = router;