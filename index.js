const express = require('express');
const exphbs = require('express-handlebars');
const node_functions = require('./models/nodes');
const routes = require('./routes/routes.js');

const app = express();

app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use('/static', express.static('public'));
app.use('/', routes);

// app.get('/data', (req, res) => {
//     node_functions.query_node(1, 'SELECT * FROM appointments')
//         .then(results => {
//             res.json({ data: results });
//         })
//         .catch(error => {
//             console.error('Error querying MySQL:', error);
//             res.status(500).json({ error: 'Error querying MySQL' });
//         });
// });

// app.get('/api/nodeStatus', async (req, res) => {
//     try {
//         const node1Connected = await node_functions.test_connection(1);
//         const node2Connected = await node_functions.test_connection(2);
//         const node3Connected = await node_functions.test_connection(3);

//         res.json({ node1Connected, node2Connected, node3Connected });
//     } catch (error) {
//         console.error('Error fetching node status:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// app.get('/viewtable', (req, res) => {
//     res.render('viewtable')
// });

app.listen(8000, () => {
    console.log('Server is running on port 8080');
});
module.exports = app;