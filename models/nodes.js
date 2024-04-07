const mysql = require('mysql2/promise');

const node1 = mysql.createPool({
    host: 'ccscloud.dlsu.edu.ph',
    user: 'root',
    password: 'F2qmexnhkb8GYjENHB5zyJaV',
    database: 'mco2',
    port: 20144,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 5000
});

const node2 = mysql.createPool({
    host: 'ccscloud.dlsu.edu.ph',
    user: 'root',
    password: 'F2qmexnhkb8GYjENHB5zyJaV',
    database: 'mco2',
    port: 20145,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 5000
});

const node3 = mysql.createPool({
    host: 'ccscloud.dlsu.edu.ph',
    user: 'root',
    password: 'F2qmexnhkb8GYjENHB5zyJaV',
    database: 'mco2',
    port: 20146,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 5000
});

const node_functions = {
    async test_connection(node){
        let selectedNode;
        switch (node) {
            case 1:
                selectedNode = node1;
                break;
            case 2:
                selectedNode = node2;
                break;
            case 3:
                selectedNode = node3;
                break;
            default:
                console.log('Invalid node');
                return;
        }
        try {
            await selectedNode.query('SELECT 1')
            console.log(`Connected to node ${node}`);
        } catch (error) {
            console.error(`Error connecting to node ${node}:`, error);
        }
    },

    async query_node(node, query) {
        let selectedNode;
        switch (node) {
            case 1:
                selectedNode = node1;
                break;
            case 2:
                selectedNode = node2;
                break;
            case 3:
                selectedNode = node3;
                break;
            default:
                console.log('Invalid node');
                return;
        }
        try {
            const [rows, fields] = await selectedNode.query(query)
            console.log(rows);
            return rows;
        } catch (error) {
            console.error('Error querying node:', error);
            return null
        }
    }

};

module.exports = node_functions;