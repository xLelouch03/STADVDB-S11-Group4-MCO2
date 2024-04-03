const express = require('express');
const exphbs = require('express-handlebars');
const central_node = require('./models/nodes');


const app = express();

app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

central_node.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});