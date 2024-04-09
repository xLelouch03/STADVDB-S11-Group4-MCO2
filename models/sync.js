
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
                            var pxid = logs[i].pxid ? `'${logs[i].pxid}'` : null;
                            var doctorid = logs[i].doctorid ? `'${logs[i].doctorid}'` : null;
                            var clinicid = logs[i].clinicid ? `'${logs[i].clinicid}'` : null;
                            var apptid = logs[i].apptid ? `'${logs[i].apptid}'` : null;
                            var status = logs[i].status ? `'${logs[i].status}'` : null;
                            var timeQueued = logs[i].TimeQueued ? `'${new Date(logs[i].TimeQueued).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            var queueDate = logs[i].QueueDate ? `'${new Date(logs[i].QueueDate).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            var startTime = logs[i].StartTime ? `'${new Date(logs[i].StartTime).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            var endTime = logs[i].EndTime ? `'${new Date(logs[i].EndTime).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            var type = logs[i].type ? `'${logs[i].type}'` : null;
                            var isVirtual = logs[i].IsVirtual ? `'${logs[i].IsVirtual}'` : null;
                            var mainSpecialty = logs[i].mainspecialty ? `'${logs[i].mainspecialty}'` : null;
                            var hospitalName = logs[i].hospitalname ? `'${logs[i].hospitalname}'` : null;
                            var isHospital = logs[i].IsHospital ? `'${logs[i].IsHospital}'` : null;
                            var city = logs[i].City ? `'${logs[i].City}'` : null;
                            var province = logs[i].Province ? `'${logs[i].Province}'` : null;
                            var regionName = logs[i].RegionName ? `'${logs[i].RegionName}'` : null;
                            var patientAge = logs[i].patient_age ? `'${logs[i].patient_age}'` : null;
                            var patientGender = logs[i].patient_gender ? `'${logs[i].patient_gender}'` : null;
                            var location = logs[i].Location ? `'${logs[i].Location}'` : null;

                            var query = await queryHelper.to_insert_query(pxid, clinicid, doctorid, apptid, status, timeQueued, queueDate, startTime, endTime, type, isVirtual, mainSpecialty, hospitalName, isHospital, city, province, regionName, patientAge, patientGender, location);
                            
                            var finished_log = await queryHelper.to_finish_log(logs[i].logid);
                            tx.non_update_tx(primary_node, finished_log)
                            var final_result = await tx.non_update_tx(primary_node, query);

                        case 'UPDATE':
                            var pxid = logs[i].pxid ? `'${logs[i].pxid}'` : null;
                            var clinicid = logs[i].clinicid ? `'${logs[i].clinicid}'` : null;
                            var doctorid = logs[i].doctorid ? `'${logs[i].doctorid}'` : null;
                            var apptid = logs[i].apptid ? `'${logs[i].apptid}'` : null;
                            var status = logs[i].status ? `'${logs[i].status}'` : null;
                            var timeQueued = logs[i].TimeQueued ? `'${new Date(logs[i].TimeQueued).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            var queueDate = logs[i].QueueDate ? `'${new Date(logs[i].QueueDate).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            var startTime = logs[i].StartTime ? `'${new Date(logs[i].StartTime).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            var endTime = logs[i].EndTime ? `'${new Date(logs[i].EndTime).toISOString().slice(0, 19).replace('T', ' ')}'` : null;
                            var type = logs[i].type ? `'${logs[i].type}'` : null;
                            var isVirtual = logs[i].IsVirtual ? `'${logs[i].IsVirtual}'` : null;
                            var mainSpecialty = logs[i].mainspecialty ? `'${logs[i].mainspecialty}'` : null;
                            var hospitalName = logs[i].hospitalname ? `'${logs[i].hospitalname}'` : null;
                            var isHospital = logs[i].IsHospital ? `'${logs[i].IsHospital}'` : null;
                            var city = logs[i].City ? `'${logs[i].City}'` : null;
                            var province = logs[i].Province ? `'${logs[i].Province}'` : null;
                            var regionName = logs[i].RegionName ? `'${logs[i].RegionName}'` : null;
                            var patientAge = logs[i].patient_age ? `'${logs[i].patient_age}'` : null;
                            var patientGender = logs[i].patient_gender ? `'${logs[i].patient_gender}'` : null;
                            var location = logs[i].Location ? `'${logs[i].Location}'` : null;

                            var query = await queryHelper.to_update_query(logs[i].id, pxid, clinicid, doctorid, apptid, status, timeQueued, queueDate, startTime, endTime, type, isVirtual, mainSpecialty, hospitalName, isHospital, city, province, regionName, patientAge, patientGender, location);
                            
                            var finished_log = await queryHelper.to_finish_log(logs[i].logid);
                            tx.non_update_tx(primary_node, finished_log)
                            var final_result = await tx.non_update_tx(primary_node, query);

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
    }
}
module.exports = sync_funcs;