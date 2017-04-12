const requireDirectory = require('require-directory');
const routes = requireDirectory(module);
const express = require('express');

module.exports = (app) => {
    // base
    app.get('/api/', (req, res) => {
        res.status(200).send('Success');
    });

    //routes
    Object.keys(routes).forEach(routeName => {
        let router = express.Router();
        require('./' + routeName)(router);
        app.use('/api/' + routeName, router);
    })
}

