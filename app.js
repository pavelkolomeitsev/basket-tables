// connect all necessary third-party packages
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// create an application
const app = express();

// set templating engine
app.set('view engine', 'ejs'); // what engine
app.set('views', 'views'); // where it is located

// export routes
const resultRoute = require('./routes/results');
const errorRoute = require('./routes/404');

// to avoid double-call
app.get('/favicon.ico', (req, res) => res.status(204));

// run body-parser for parsing data
app.use(bodyParser.urlencoded({ extended: false }));

// connect our css-files
app.use(express.static(path.join(__dirname, 'public')));

// register routes
app.use(resultRoute);
app.use(errorRoute);

// run server
app.listen(9090);