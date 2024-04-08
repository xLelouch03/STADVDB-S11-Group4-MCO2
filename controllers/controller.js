const controller = {
    renderInitial: async function (req,res){
        res.render('index');
    },
    nodeStatus: async function (req,res){
        try {
            const node1Connected = await node_functions.test_connection(1);
            const node2Connected = await node_functions.test_connection(2);
            const node3Connected = await node_functions.test_connection(3);
    
            res.json({ node1Connected, node2Connected, node3Connected });
        } catch (error) {
            console.error('Error fetching node status:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    viewTable: async function (req,res){
        res.render('viewtable')
    },
    getData: async function(req,res){
        node_functions.query_node(1, 'SELECT * FROM appointments')
        .then(results => {
            res.json({ data: results });
        })
        .catch(error => {
            console.error('Error querying MySQL:', error);
            res.status(500).json({ error: 'Error querying MySQL' });
        });
    }
}
module.exports = controller;