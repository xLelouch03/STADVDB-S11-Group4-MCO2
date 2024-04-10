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
app.post('/delete/:id', controller.delete)
app.post('/update/:id', controller.postUpdate)
app.post('/select', controller.validateSelect)
app.get('/results', controller.results)
app.get('/getReport', controller.getReport)

/* 404 route */
// app.get('*', function(req, res) { res.render('error', {}); } );
module.exports = app;