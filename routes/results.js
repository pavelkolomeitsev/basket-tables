const express = require('express');

const route = express.Router();

const resultController = require('../controllers/resultController');
const tableController = require('../controllers/tableController');

route.get('/', resultController.getAllResults);

route.get('/results', resultController.getAllResults);

route.get('/add-result', resultController.getAddResult);

route.post('/add-result', resultController.postAddResult);

route.get('/tables', tableController.getTables);

route.post('/tables', tableController.postTables);

// export a route to app.js
module.exports = route;