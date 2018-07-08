const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const backendless = require('backendless');

const todoController = require('./controllers/todoController');

// Setup Backendless
const APP_ID = 'EF201799-09B6-2EE7-FFC0-169225608F00';
const API_KEY = 'A75A33AA-35FB-AB4B-FFB2-A5C8571F0A00';

backendless.initApp(APP_ID, API_KEY);

// Setup handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

// Setup parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// Setup static file access
app.use(express.static('./public'));

// Setup controllers
todoController(app, backendless);

// Set listener
app.listen(5000);
console.log('> Listening on 5000');
