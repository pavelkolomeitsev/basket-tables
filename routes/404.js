// connect necessary packages
const express = require('express');

// create a router
const route = express.Router();

// connect controller...
const errorController = require('../controllers/errorController');

// run the error page on server
route.use(errorController.errorPage);

// export a route to app.js
module.exports = route;