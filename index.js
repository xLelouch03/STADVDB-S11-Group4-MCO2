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

app.get('/data', (req, res) => {
    const data = [
        { "name": "Tiger Nixon", "position": "System Architect", "office": "Edinburgh", "age": "61", "start_date": "2011/04/25", "salary": "$320,800" },
        { "name": "Garrett Winters", "position": "Accountant", "office": "Tokyo", "age": "63", "start_date": "2011/07/25", "salary": "$170,750" }
    ];
    res.json({ data });
});


app.get('/viewtable', (req, res) => {
    
    res.render('viewtable');
    // central_node.query('SELECT * FROM appointments', (err, results) => {
    //     if (err) {
    //         console.error('Error querying MySQL: ' + err.stack);
    //         return;
    //     }
    //     res.render('viewtable', {appointments: results});
    // });
});

central_node.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});