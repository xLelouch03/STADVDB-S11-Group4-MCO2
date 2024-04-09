const nodes = require('./nodes.js');
const tx = require('./tx.js');
const qh = require('../helpers/queryHelper.js');

const db = {
    async standard_query(query) {
        let master = nodes.getPrimaryHost();

        if(master) {
            return await tx.non_update_tx(master, query);
        }
        else {
            console.log('Error performing query, no active nodes');
        }
    },

    async insert_query(data) {
        console.log(data)
        let master = await nodes.getPrimaryHost();

        if(master) {
            let query = qh.to_insert_query(data.pxid, data.clinicid, data.doctorid, data.apptid, data.status, data.TimeQueued, data.QueueDate, data.StartTime, data.EndTime, data.type, data.IsVirtual, data.mainspecialty, data.hospitalname, data.IsHospital, data.City, data.Province, data.RegionName, data.patient_age, data.patient_gender, data.Location)
            console.log(query)
            let query_log = qh.to_insert_query_log(data.pxid, data.clinicid, data.doctorid, data.apptid, data.status, data.TimeQueued, data.QueueDate, data.StartTime, data.EndTime, data.type, data.IsVirtual, data.mainspecialty, data.hospitalname, data.IsHospital, data.City, data.Province, data.RegionName, data.patient_age, data.patient_gender, data.Location)
            let result = await tx.insert_tx_with_log(master, query, query_log);

            
            return (result instanceof Error) ? false : true;
        }
        else {
            console.log('Error performing query, no active nodes');
            return false
        }
    },

    async update_query(data, id) {
        let master = await nodes.getPrimaryHost();

        if(master) {
            let query = qh.to_update_query(id, data.pxid, data.clinicid, data.doctorid, data.apptid, data.status, data.TimeQueued, data.QueueDate, data.StartTime, data.EndTime, data.type, data.IsVirtual, data.mainspecialty, data.hospitalname, data.IsHospital, data.City, data.Province, data.RegionName, data.patient_age, data.patient_gender, data.Location)
            console.log(query)
            let query_log = qh.to_update_query_log_with_id(id, data.pxid, data.clinicid, data.doctorid, data.apptid, data.status, data.TimeQueued, data.QueueDate, data.StartTime, data.EndTime, data.type, data.IsVirtual, data.mainspecialty, data.hospitalname, data.IsHospital, data.City, data.Province, data.RegionName, data.patient_age, data.patient_gender, data.Location)
            let result = await tx.update_tx_with_log(master, query, query_log, id); 
            return (result instanceof Error) ? false : true;
        }
        else {
            console.log('Error performing query, no active nodes');
            return false
        }
    },

    async delete_query(id) { 
        let master = await nodes.getPrimaryHost();

        if(master) {
            let query = 'DELETE FROM appointments WHERE id=' + id;
            let query_log = qh.to_delete_query_log(id);
            let result = await tx.update_tx_with_log(master, query, query_log, id);
            return (result instanceof Error) ? false : true;
        }
        else {
            console.log('Error performing query, no active nodes');
            return false
        }
    },

}

module.exports = db;