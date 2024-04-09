
const mysql = require('mysql2/promise');

const nodes = require('./nodes.js');
const tx = require('./tx.js');
const db = require('./db.js');
const queryHelper = require('../helpers/queryHelper.js');
const { query_node, getPrimaryHost} = require('./nodes.js');

const sync_funcs = {
    sync: async function () {
        let logs = [];

        try {
            const primary_node = await getPrimaryHost();
            let selectedNode;
            switch (primary_node) {
                case '10.2.0.144':
                    selectedNode = 1;
                    break;
                case '10.2.0.145':
                    selectedNode = 2;
                    break;
                case '10.2.0.146':
                    selectedNode = 3;
                    break;
                default:
                    primaryNode = null;
                    break;
            } 
            console.log("yes: ", selectedNode);
            logs = await query_node(selectedNode, queryHelper.to_retrieve_logs());
            if (logs) {
                logs.sort((a, b) => a.log_timestamp.getTime() - b.log_timestamp.getTime());
                
                for (let i = 0; i < logs.length; i++) {
                    switch (logs[i].t_type) {
                        case 'INSERT':
                            const pxid = logs[i].pxid ? `'${logs[i].pxid}'` : null;
                            const clinicid = logs[i].clinicid ? `'${logs[i].clinicid}'` : null;
                            const doctorid = logs[i].doctorid ? `'${logs[i].doctorid}'` : null;
                            const apptid = logs[i].apptid ? `'${logs[i].apptid}'` : null;
                            const status = logs[i].status ? `'${logs[i].status}'` : null;
                            const timeQueued = logs[i].TimeQueued ? `'${new Date(logs[i].TimeQueued).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            const queueDate = logs[i].QueueDate ? `'${new Date(logs[i].QueueDate).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            const startTime = logs[i].StartTime ? `'${new Date(logs[i].StartTime).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            const endTime = logs[i].EndTime ? `'${new Date(logs[i].EndTime).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            const type = logs[i].type ? `'${logs[i].type}'` : null;
                            const isVirtual = logs[i].IsVirtual ? `'${logs[i].IsVirtual}'` : null;
                            const mainSpecialty = logs[i].mainspecialty ? `'${logs[i].mainspecialty}'` : null;
                            const hospitalName = logs[i].hospitalname ? `'${logs[i].hospitalname}'` : null;
                            const isHospital = logs[i].IsHospital ? `'${logs[i].IsHospital}'` : null;
                            const city = logs[i].City ? `'${logs[i].City}'` : null;
                            const province = logs[i].Province ? `'${logs[i].Province}'` : null;
                            const regionName = logs[i].RegionName ? `'${logs[i].RegionName}'` : null;
                            const patientAge = logs[i].patient_age ? `'${logs[i].patient_age}'` : null;
                            const patientGender = logs[i].patient_gender ? `'${logs[i].patient_gender}'` : null;
                            const location = logs[i].Location ? `'${logs[i].Location}'` : null;

                            const query = await queryHelper.to_insert_query(pxid, clinicid, doctorid, apptid, status, timeQueued, queueDate, startTime, endTime, type, isVirtual, mainSpecialty, hospitalName, isHospital, city, province, regionName, patientAge, patientGender, location);
                            
                            const finished_log = await queryHelper.to_finish_log(logs[i].logid);
                            tx.non_update_tx(primary_node, finished_log)
                            const final_result = await tx.non_update_tx(primary_node, query);

                        // case 'UPDATE':
                        //     query = queryHelper.to_update_query(logs[i].id + "," + "'" + logs[i].pxid + "'", "'" + logs[i].clinicid+"'", "'" + logs[i].doctorid+"'", "'" + logs[i].apptid+"'", "'" + logs[i].status+"'", "'" + new Date(logs[i].TimeQueued).toISOString().slice(0, 19).replace('T', ' ')+"'", "'" + new Date(logs[i].QueueDate).toISOString().slice(0, 19).replace('T', ' ')+"'", 
                        //     "'" + new Date(logs[i].StartTime).toISOString().slice(0, 19).replace('T', ' ')+"'", "'" + new Date(logs[i].EndTime).toISOString().slice(0, 19).replace('T', ' ')+"'", "'" + logs[i].type+"'", "'" + logs[i].IsVirtual+"'", "'" + logs[i].mainspecialty+"'", "'" + logs[i].hospitalname+"'", "'" + logs[i].IsHospital+"'", "'" + logs[i].City+"'", "'" + logs[i].Province+"'", "'" + logs[i].RegionName+"'", "'" + logs[i].patient_age+"'", "'" + logs[i].patient_gender+"'", "'" + logs[i].Location+"'");
                            
                        //     let update = queryHelper.to_finish_log(logs[i].statement_id);
                        //     let result = await transaction.make_2transaction(selectedNode, query, update, 'UPDATE', logs[i].id, logs[i].node_from);
                        //     return (result instanceof Error) ? false : true;

                        // case 'DELETE':
                        //     query = queryHelper.to_delete_query(logs[i].id);
                        //     var update = queryHelper.to_finish_log(logs[i].statement_id);
                        //     var result = await transaction.make_2transaction(logs[i].node_to, query, update, 'DELETE', logs[i].id, logs[i].node_from);
                        //     return (result instanceof Error) ? false : true;
                    }
                }
            }

            return true;
        }
        catch (error) {
            console.log(error)
            return false;
        }
    },

    // sync_follower_node: async function (node) {
    //     let logs = [];
    //     let logs2 = [];
    //     let logs3 = [];

    //     try {
    //         var other = (node === 2) ? 3 : 2;

    //         if (await ping_node(1))  logs2 = await query_node(1, queryHelper.to_retrieve_logs(node));
    //         if (await ping_node(other)) logs3 = await query_node(other, queryHelper.to_retrieve_logs(node));
            
    //         if (logs2[0]) logs = logs2[0];
    //         if (logs3[0] && logs) logs = logs.concat(logs3[0]);
    //         else if (logs3[0]) logs = logs3[0];
            
    //         if (logs) {
    //             for (let i = 0; i < logs.length; i++) {
    //                 if (await ping_node(logs[i].node_to)) {
    //                     let query;
    //                     switch (logs[i].type) {
    //                         case 'INSERT':
    //                             if (logs[i].id) 
    //                                 query = queryHelper.to_insert_query_with_id(logs[i].id, logs[i].name, logs[i].rank, logs[i].year);
    //                             else 
    //                                 query = queryHelper.to_insert_query(logs[i].name, logs[i].rank, logs[i].year);
    //                             break;
    //                         case 'UPDATE':
                                
    //                             if (logs[i].new_id) {
    //                                 query = queryHelper.to_update_id_query(logs[i].new_id, logs[i].id);
    //                             }
    //                             else {
    //                                 query = queryHelper.to_update_query(logs[i].id, logs[i].name, logs[i].rank, logs[i].year);
    //                             }
    //                             break;
                                
    //                         case 'DELETE':
    //                             query = queryHelper.to_delete_query(logs[i].id); break;
    //                     }
    //                     var result = await transaction.insert_update_transaction(logs[i].node_to, query, queryHelper.to_finish_log(logs[i].statement_id), logs[i].node_from, logs[i].type, logs[i].id);
    //                     console.log('Synced to Node ' + node);
    //                     return (result instanceof Error) ? false : true;
    //                 }
    //             }
    //         }
    //         return true;
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }
}
module.exports = sync_funcs;