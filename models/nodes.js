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
            return true;
        } catch (error) {
            console.log(`Node ${node} is offline`);
            //console.error(`Error connecting to node ${node}:`, error);
            return false;
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
    },

    async query_node_with_params(node, query, params) {
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
                return null; // Return null to indicate failure
        }
        try {
            const [rows, fields] = await selectedNode.query(query, params);
            console.log(rows);
            return rows;
        } catch (error) {
            console.error('Error querying node:', error);
            return null; // Return null to indicate failure
        }
    },
    

    // get single connection for transactions
    async get_single_connection(node) {
        console.log(node)
        let selectedNode;
        switch (node) {
            case '10.2.0.144':
                selectedNode = node1;
                break;
            case '10.2.0.145':
                selectedNode = node2;
                break;
            case '10.2.0.146':
                selectedNode = node3;
                break;
            default:
                primaryNode = null;
                break;
        } 
        try {
            return await selectedNode.getConnection();
        }
        catch (error) {
            console.error('Error getting connection:', error);
            return null;
        }
    },

    // get the primary server
    async getPrimaryHost() {
        const nodes = [node1, node2, node3]; 
        
        for (const node of nodes) {
            try {
                const [rows, fields] = await node.query("SELECT MEMBER_HOST FROM performance_schema.replication_group_members WHERE MEMBER_ROLE = 'PRIMARY'");
                const primaryHost = rows[0].MEMBER_HOST;
                return primaryHost;
            } catch (error) {
                // Continue to the next node if there's an error
                continue;
            }
        }
        
        // If all nodes fail, return null
        return null;
    }
};

module.exports = node_functions;