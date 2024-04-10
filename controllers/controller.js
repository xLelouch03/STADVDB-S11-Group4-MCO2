const node_functions = require('../models/nodes');
const db = require('../models/db');

let primaryNode;
const controller = {
    renderInitial: async function (req,res){
        res.render('index');
    },

    nodeStatus: async function (req,res){
        try {
            const node1Connected = await node_functions.test_connection(1);
            const node2Connected = await node_functions.test_connection(2);
            const node3Connected = await node_functions.test_connection(3);

            // Get the current primary server's member host
            const primaryHost = await node_functions.getPrimaryHost();

            // Map the primary host to the corresponding node number
            switch (primaryHost) {
                case '10.2.0.144':
                    primaryNode = 1;
                    break;
                case '10.2.0.145':
                    primaryNode = 2;
                    break;
                case '10.2.0.146':
                    primaryNode = 3;
                    break;
                default:
                    primaryNode = null;
                    break;
            }    
            res.json({ node1Connected, node2Connected, node3Connected });
        } catch (error) {
            console.error('Error fetching node status:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    viewTable: async function (req,res){
        res.render('viewtable')
    },

    create: async function (req,res){
        res.render('create')
    },
    
    select: async function (req,res){
        res.render('select')
    },

    results: async function (req,res){
        res.render('results')
    },

    getReport: async function (req,res){
        let query = 'SELECT Location, COUNT(*) AS total_appointments FROM appointments GROUP BY Location;'

        try {
            const results = await db.standard_query(query);
            res.json({ data: results[0] });
        }
        catch (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).json({ error: 'Error querying MySQL' });
        }
    },

    validateSelect: async function (req,res){
        const id = req.body.id;
        let query = 'SELECT * FROM appointments WHERE id = ' + id;

        try {
            const results = await db.standard_query(query);
            if(results[0].length === 0) { 
                return res.status(404).json({ error: 'No appointments found with the provided ID' });
            }
            res.json({ data: results[0] });
        }
        catch (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).json({ error: 'Error querying MySQL' });
        }
    },

    update: async function (req,res){
        res.render('update')
    },

    getData: async function(req,res){
        let query = 'SELECT * FROM appointments';

        try {
            const results = await db.standard_query(query);
            res.json({ data: results[0] });
        }
        catch (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).json({ error: 'Error querying MySQL' });
        }
    },

    getOne: async function(req, res) {
        const id = req.params.id; // Access ID from URL params
        let query = 'SELECT * FROM appointments WHERE id = ' + id;

        try {
            const results = await db.standard_query(query);
            res.json({ data: results[0] });
        }
        catch (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).json({ error: 'Error querying MySQL' });
        }
    },
    
    postCreate: async function(req, res){
        try {
            const result = await db.insert_query(req.body)
            let data
            if(result) {
                data = {
                    result: result,
                    status: true,
                    message: 'Data inserted successfully'
                }
                res.status(200).send(data)
            }
            else {
                data = {
                    status: false,
                    message: 'Error inserting data'
                }
                res.status(500).send(data)
            }
        }
        catch (error) {
                console.error('Error inserting data:', error);
                res.status(500).json({ error: 'Error inserting data' });
        }
    },

    postUpdate: async function(req, res){
        try {
            const result = await db.update_query(req.body, req.params.id)
            let data
            if(result) {
                data = {
                    result: result,
                    status: true,
                    message: 'Data updated successfully'
                }
                res.status(200).send(data)
            }
            else {
                data = {
                    status: false,
                    message: 'Error updating data'
                }
                res.status(500).send(data)
            }        
        }
        catch (error) {
            console.error('Error updating data:', error);
            res.status(500).json({ error: 'Error updating data' });
        }
    },

    delete: async function(req, res) {
        try {
            const result = await db.delete_query(req.params.id)
            let data
            if(result) {
                data = {
                    result: result,
                    status: true,
                    message: 'Data Deleted successfully'
                }
                res.status(200).send(data)
            }
            else {
                data = {
                    status: false,
                    message: 'Error deleting data'
                }
                res.status(500).send(data)
            }  
        }
        catch (error) {
            console.error('Error deleting data:', error);
            res.status(500).json({ error: 'Error deleting data' });
        }
    }
}
module.exports = controller;