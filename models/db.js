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
        let master = await nodes.getPrimaryHost();

        if(master) {
            let query = qh.to_insert_query(data.pxid, data.clinicid, data.doctorid, data.apptid, data.status, data.TimeQueued, data.QueueDate, data.StartTime, data.EndTime, data.type, data.IsVirtual, data.mainspecialty, data.hospitalname, data.IsHospital, data.City, data.Province, data.RegionName, data.patient_age, data.patient_gender, 'test')
            console.log(query)
            let query_log = qh.to_insert_query_log(data.pxid, data.clinicid, data.doctorid, data.apptid, data.status, data.TimeQueued, data.QueueDate, data.StartTime, data.EndTime, data.type, data.IsVirtual, data.mainspecialty, data.hospitalname, data.IsHospital, data.City, data.Province, data.RegionName, data.patient_age, data.patient_gender, 'test')
            let result = await tx.insert_tx_with_log(master, query, query_log);

            return (result instanceof Error) ? result : true;
        }
        else {
            console.log('Error performing query, no active nodes');
            return false
        }
    },

    async update_query() {
        let master = await nodes.getPrimaryHost();

        if(master) {
        }
        else {
            console.log('Error performing query, no active nodes');
        }
    },

}

module.exports = db;