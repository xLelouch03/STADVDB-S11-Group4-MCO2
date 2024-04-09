const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const sync = require('./models/sync.js');
const app = express();

app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static('public'));
app.use('/', routes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
    sync.sync()
});

module.exports = app;