const { query } = require('express');
const mysql = require('mysql2');

const node1 = mysql.createConnection({
    host: 'ccscloud.dlsu.edu.ph',
    user: 'root',
    password: 'F2qmexnhkb8GYjENHB5zyJaV',
    database: 'mco2',
    port: 20144
});

const node2 = mysql.createConnection({
    host: 'ccscloud.dlsu.edu.ph',
    user: 'root',
    password: 'F2qmexnhkb8GYjENHB5zyJaV',
    database: 'mco2',
    port: 20145
});

const node3 = mysql.createConnection({
    host: 'ccscloud.dlsu.edu.ph',
    user: 'root',
    password: 'F2qmexnhkb8GYjENHB5zyJaV',
    database: 'mco2',
    port: 20146
});

node_functions = {
    async connect_nodes() {
        await node1.connect((err) => {
    	    if (err) {
                console.log('Error connecting to node 1');
                return;
            }
            console.log('Connected to node 1');
         });

        await node2.connect((err) => {
            if (err) {
                console.log('Error connecting to node 2');
                 return;
            }
                console.log('Connected to node 2');
        });

        await node3.connect((err) => {
            if (err) {
                console.log('Error connecting to node 3');
                return;
            }
            console.log('Connected to node 3');
        }); 
    },

    async test_connection(node) {
        switch (node) {
            case 1:
                await node1.ping((err) => {
                    if (err) {
                        console.log('Node 1 is offline');
                        return false;
                    }
                    console.log('Node 1 is online');
                    return true
                });
                break;
            case 2:
                await node2.ping((err) => {
                    if (err) {
                        console.log('Node 2 is offline');
                        return false;
                    }
                    console.log('Node 2 is online');
                    return true
                });
                break;
            case 3:
                await node3.ping((err) => {
                    if (err) {
                        console.log('Node 3 is offline');
                        return false;
                    }
                    console.log('Node 3 is online');
                    return true
                });
                break;
            default:
                console.log('Invalid node');
                break;
        }
    },

    async disconnect_node(node) {
        switch (node) {
            case 1:
                await node1.end((err) => {
                    if (err) {
                        console.log('Error disconnecting from node 1');
                        return;
                    }
                    console.log('Disconnected from node 1');
                });
                break;
            case 2:
                await node2.end((err) => {
                    if (err) {
                        console.log('Error disconnecting from node 2');
                        return;
                    }
                    console.log('Disconnected from node 2');
                });
                break;
            case 3:
                await node3.end((err) => {
                    if (err) {
                        console.log('Error disconnecting from node 3');
                        return;
                    }
                    console.log('Disconnected from node 3');
                });
                break;
            default:
                console.log('Invalid node');
                break;
        }
    },

    query_node(node, query) {
        return new Promise((resolve, reject) => {
            switch (node) {
                case 1:
                    node1.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Error querying node 1');
                            reject(err);
                        }
                        console.log('Query successful');
                        resolve(results);
                    });
                    break;
                case 2:
                    node2.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Error querying node 2');
                            reject(err);
                        }
                        console.log('Query successful');
                        resolve(results);
                    });
                    break;
                case 3:
                    node3.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Error querying node 3');
                            reject(err);
                        }
                        console.log('Query successful');
                        resolve(results);
                    });
                    break;
                default:
                    console.log('Invalid node');
                    break;
            }
        });
    }
};

module.exports = node_functions;