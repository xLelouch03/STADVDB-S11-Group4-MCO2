const nodes = require('./nodes.js');
const {for_update} = require('../helpers/queryHelper.js');

const tx_funcs = {
    // non updating transactions (select and insert)
    async non_update_tx(active_node, query){
        try {
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
    insert_transaction_with_log: async function () {
        try {
            let conn = await nodes.connect_node(primaryNode); // PROBLEM: how does connection choose node
            if (conn)
                try {
                    await conn.beginTransaction();

                    await conn.query(`SET @@session.time_zone = "+08:00";`);
                    var result = await conn.query(query);
                    console.log('Executed ' + query + ' at Node ' + node_to);

                    var log = queryHelper.to_insert_query_log_with_id(result[0].insertId, name, year, rank, node_from, node_to);
                    var resultlog = await conn.query(log);
                    console.log('Created ' + log + ' at Node ' + node_to);

                    await conn.commit();
                    await conn.release();
                    return result;
                }
                catch (error) {
                    console.log(error)
                    console.log('Rolled back the data.');
                    conn.rollback(node_to);
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
    }
}

module.exports = tx_funcs;