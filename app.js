const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const todoController = require('./controllers/todoController');

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
todoController(app);

// Set listener
app.listen(5000);
console.log('> Listening on 5000');
