const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

// Setup handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

// Setup static file access
app.use(express.static('./public'));

// Set listener
app.listen(5000);
console.log('> Listening on 5000');
