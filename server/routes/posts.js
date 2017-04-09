const Mongo = require('MongoDB').MongoClient;
const ObjectId = require('MongoDB').ObjectID;

module.exports = function(router){
    const conn = 'mongodb://localhost:27017/MightyFine';

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
            console.log(req.params)
            Mongo.connect(conn)
                .then( db => db.collection('posts').deleteOne({"_id": new ObjectId(req.params.post_id)})
            ).then(
                post => res.status(200).send(post),
                err => res.status(500).send(err)
            )
        });

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
}