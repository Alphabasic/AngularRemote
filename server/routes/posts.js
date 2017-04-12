const Mongo = require('MongoDB').MongoClient;
const ObjectId = require('MongoDB').ObjectID;
const conn = 'mongodb://localhost:27017/MightyFine';

module.exports = function(router){

// --------------------------------------------------------------------------------------- //

router.route('/')
  .get((req, res) => {
      Mongo.connect(conn)
          .then( db => db.collection('posts').find().toArray())
          .then( 
              items => res.status(200).json(items), 
              err => res.status(500).send(err)
          );
  })
  .put((req, res) => {
    Mongo.connect(conn)
      .then( db => db.collection('posts').insertOne(
          {
          title: req.body.title || "",
          body: req.body.body || ""
          }
      )
      ).then(
          post => res.status(200).send(post.ops[0]),
          err => res.status(500).send(err)
      )
  })

router.route('/:post_id')
  .get((req, res) => {
      Mongo.connect(conn)
          .then( db => db.collection('posts').findOne({"_id": new ObjectId(req.params.post_id)}))
      .then( 
          post => res.status(200).send(post), 
          err => res.status(500)
      )
      .catch(err => res.status(500).send(err))
  })
  .put((req, res) => {
      Mongo.connect(conn)
          .then( db => db.collection('posts').update(
              {"_id": new ObjectId(req.params.post_id)},
              {
              title: req.body.title || "",
              body: req.body.body || ""
              }
          )
      ).then(
          post => res.status(200).send(post),
          err => res.status(500).send(err)
      )
  })
  .delete((req, res) => {
      Mongo.connect(conn)
          .then( db => db.collection('posts').deleteOne({"_id": new ObjectId(req.params.post_id)})
      ).then(
          post => res.status(200).send(post),
          err => res.status(500).send(err)
      )
  });

// --------------------------------------------------------------------------------------- //

router.route('/:post_id/comments/')
  .get((req, res) => {
      // Mongo.connect(conn)
      //     .then( db => db.collection('posts').findOne({"_id": new ObjectId(req.params.post_id)}))
      //     .then( 
      //         items => res.status(200).json(items), 
      //         err => res.status(500).send(err)
      //     );
      console.log('/comments')
      res.status(200)
        .send(JSON.stringify([{
          '_id': new ObjectId(),
          '_postId': req.params.post_id,
          'body': 'comment',
          'author': 'comment'
        }]))
  })
  .put((req, res) => {
    Mongo.connect(conn)
      res.status(200)
        .send(JSON.stringify({
          '_id': new ObjectId(),
          'body': 'comment',
          'author': 'comment'
        }))
    //   .then( db => db.collection('posts').insertOne(
    //       {
    //       title: req.body.title || "",
    //       body: req.body.body || ""
    //       }
    //   )
    //   ).then(
    //       post => res.status(200).send(post.ops[0]),
    //       err => res.status(500).send(err)
    //   )
  })

router.route('/:post_id/comments/:comment_id')
  .get((req, res) => {
    //   Mongo.connect(conn)
    //       .then( db => db.collection('posts').findOne({"_id": new ObjectId(req.params.post_id)}))
    //   .then( 
    //       post => res.status(200).send(post), 
    //       err => res.status(500)
    //   )
    //   .catch(err => res.status(500).send(err))
    res.status(200)
        .send(JSON.stringify([{
          '_id': new ObjectId(),
          'body': 'comment',
          'author': 'comment'
        }]))
  })
  .put((req, res) => {
      Mongo.connect(conn)
          .then( db => db.collection('posts').update(
              {"_id": new ObjectId(req.params.post_id)},
              {
              title: req.body.title || "",
              body: req.body.body || ""
              }
          )
      ).then(
          post => res.status(200).send(post),
          err => res.status(500).send(err)
      )
  })
  .delete((req, res) => {
      Mongo.connect(conn)
          .then( db => db.collection('posts').deleteOne({"_id": new ObjectId(req.params.post_id)})
      ).then(
          post => res.status(200).send(post),
          err => res.status(500).send(err)
      )
  });

// --------------------------------------------------------------------------------------- //

}