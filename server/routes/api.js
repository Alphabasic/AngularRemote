const express = require('express');
const router = express.Router();
const Mongo = require('MongoDB').MongoClient;

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

module.exports = router;