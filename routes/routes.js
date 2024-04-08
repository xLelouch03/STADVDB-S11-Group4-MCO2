const express = require('express');
const controller = require('../controllers/controller.js');
const app = express.Router();

app.get('/', controller.renderInitial);
app.get('/data', controller.getData);
app.get ('/api/nodeStatus', controller.nodeStatus);
app.get('/viewtable', controller.viewTable);
app.get('/create', controller.create)
app.post('/create', controller.postCreate)
app.get('/update', controller.select)
app.get('/update/:id', controller.update)
app.get('/get/:id', controller.getOne)


// app.get('/devMenu', controller.getDevMenu);
// app.post('/devMenu/select', controller.postQuerySelect);
// app.post('/delete/:id/:year', controller.postDeleteMovie);
// app.post('/add', controller.postInsertMovie);
// app.put('/edit/:id', controller.postUpdateMovie);


/* 404 route */
// app.get('*', function(req, res) { res.render('error', {}); } );
module.exports = app;