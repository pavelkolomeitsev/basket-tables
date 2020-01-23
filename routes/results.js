const express = require('express');

const route = express.Router();

const resultController = require('../controllers/resultController');

route.get('/', resultController.getAllResults);

route.get('/results', resultController.getAllResults);

// export a route to app.js
module.exports = route;