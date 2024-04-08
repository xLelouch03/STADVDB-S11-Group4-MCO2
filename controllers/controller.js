const node_functions = require('../models/nodes');
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

    update: async function (req,res){
        res.render('update')
    },

    getData: async function(req,res){
        node_functions.query_node(primaryNode, 'SELECT * FROM appointments')
        .then(results => {
            res.json({ data: results });
        })
        .catch(error => {
            console.error('Error querying MySQL:', error);
            res.status(500).json({ error: 'Error querying MySQL' });
        });
    },

    getOne: async function(req, res) {
        const id = req.params.id; // Access ID from URL params
        node_functions.query_node_with_params(primaryNode, 'SELECT * FROM appointments WHERE id = ?', [id])
            .then(results => {
                res.json({ data: results });
            })
            .catch(error => {
                console.error('Error querying MySQL:', error);
                res.status(500).json({ error: 'Error querying MySQL' });
            });
    },
    

    postCreate: async function(req,res){
       console.log("here");
    },
}
module.exports = controller;