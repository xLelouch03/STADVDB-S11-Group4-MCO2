const nodes = require('./nodes');
const {to_select_for_update} = require('../helpers/queryHelper');

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
                    await conn.query(to_select_for_update(id))

                    await conn.query('SET @@session.time_zone = "+08:00";')

                    let result = await conn.query(query);
                    console.log('Updated transaction:', result);

                    await conn.commit();
                    await conn.release();
                    return result;
                }
                catch (error) {
                    console.error('Error inserting transaction:', error);
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
}