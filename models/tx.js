const nodes = require('./nodes.js');
const {for_update, to_finish_log} = require('../helpers/queryHelper.js');

const tx_funcs = {
    // non updating transactions (select and insert)
    async non_update_tx(active_node, query){
        try {
            console.log('Connecting to node:', active_node);
            let conn = await nodes.get_single_connection(active_node);

            if(conn) {
                try {
                    await conn.beginTransaction();
                    await conn.query('SET @@session.time_zone = "+08:00";')

                    let result = await conn.query(query);
                    console.log('Transaction succesful:', result);

                    await conn.commit();
                    await conn.release();
                    return result;
                }
                catch (error) {
                    console.error('Error performing transaction:', error);
                    console.log('Rolled back data');
                    conn.rollback();
                    conn.release();
                    return error;
                }
            } 
            else {
                console.log('Error getting connection');
            }
        }
        catch (error) {
            console.error('Error Connecting:', error);
            return error;
        }
    },

    // for updating or deleting rows
    async update_tx(active_node, query, id) {
        try {
            let conn = await nodes.get_single_connection(active_node);

            if(conn) {
                try {
                    await conn.beginTransaction();

                    // lock the row for updating
                    await conn.query(for_update(id))

                    await conn.query('SET @@session.time_zone = "+08:00";')

                    let result = await conn.query(query);
                    console.log('Updated transaction:', result);

                    await conn.commit();
                    await conn.release();
                    return result;
                }
                catch (error) {
                    console.error('Error updating transaction:', error);
                    console.log('Rolled back data');
                    conn.rollback();
                    conn.release();
                    return error;
                }
            } 
            else {
                console.log('Error getting connection');
            }
        }
        catch (error) {
            console.error('Error Connecting:', error);
          
        }
    },

    async insert_tx_with_log(active_node, query, query_log) {
        let primaryNode
        switch (active_node) {
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

        try {
            let conn = await nodes.get_single_connection(active_node);

            if (conn)
                try {
                    await conn.beginTransaction();

                    await conn.query(`SET @@session.time_zone = "+08:00";`);
                    let result = await conn.query(query);
                    console.log('Executed ' + query + ' at Node ' + primaryNode)

                    let resultlog = await conn.query(query_log);
                    console.log('Created ' + result + ' at Node ' + primaryNode);

                    let logupdate = await conn.query(to_finish_log(resultlog[0].insertId))
                    console.log('Update log at ' + resultlog[0].insertId)
                    
                    await conn.commit();
                    await conn.release();
                    return result;
                }
                catch (error) {
                    console.log(error)
                    console.log('Rolled back the data.');
                    conn.rollback();
                    conn.release();
                    return error;
                }
            else {
                console.log('Unable to connect!');
            }
        }
        catch (error) {
            console.log(error);
            console.log('Unable to connect!');
            return error;
        }
    },

    update_tx_with_log: async function (active_node, query, query_log, id) {
        let primaryNode
        switch (active_node) {
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
        
        try {
            let conn = await nodes.get_single_connection(active_node);
            if (conn)
                try {
                    await conn.beginTransaction();

                    // lock the row for updating
                    await conn.query(for_update(id))

                    await conn.query(`SET @@session.time_zone = "+08:00";`);
                    let result = await conn.query(query);
                    console.log('Executed ' + query + ' at Node ' + primaryNode);

                    let resultlog = await conn.query(query_log);
                    console.log('Created ' + query_log + ' at Node ' + primaryNode);

                    let logupdate = await conn.query(to_finish_log(resultlog[0].insertId))
                    console.log('Update log at ' + resultlog[0].insertId)

                    await conn.commit();
                    await conn.release();
                    return result;
                }
                catch (error) {
                    console.log(error)
                    console.log('Rolled back the data.');
                    conn.rollback();
                    conn.release();
                    return error;
                }
            else {
                console.log('Unable to connect!');
            }
        }
        catch (error) {
            console.log(error);
            console.log('Unable to connect!');
            return error;
        }
    },
    
}

module.exports = tx_funcs;