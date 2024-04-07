const express = require('express');
const exphbs = require('express-handlebars');
const node_functions = require('./models/nodes');

const app = express();

app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/data', (req, res) => {
    node1.query('SELECT * FROM appointments', (err, results) => {
        if (err) {
            console.error('Error querying MySQL: ' + err.stack);
            res.status(500).json({ error: 'Error querying MySQL' });
            return;
        }
        res.json({ data: results });
    });
});


app.get('/viewtable', (req, res) => {
    
    res.render('viewtable')
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

node_functions.test_connection(1)
console.log(node_functions.query_node(1, 'SELECT * FROM appointments'))