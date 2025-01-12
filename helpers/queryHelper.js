//const { DateTime } = require("luxon");

const query_funcs = {
    to_update_query: function (id, pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate,
        StartTime, EndTime, type, IsVirtual, mainspecialty, hospitalname, IsHospital, City, Province, RegionName, patient_age, patient_gender, Location) {
        var query = 'UPDATE appointments SET';

        if (Location != `` && Location != null) {
            query = query + ' Location = ' + Location + ',';
        }
        if (patient_gender != `` && patient_gender != null) {
            query = query + ' patient_gender = ' + patient_gender + ',';
        }
        if (patient_age != `` && patient_age != null) {
            query = query + ' patient_age = ' + patient_age + ',';
        }
        if (RegionName != `` && RegionName != null) {
            query = query + ' RegionName = ' + RegionName + ',';
        }
        if (Province != `` && Province != null) {
            query = query + ' Province = ' + Province + ',';
        }
        if (City != `` && City != null) {
            query = query + ' City = ' + City + ',';
        }
        if (IsHospital != `` && IsHospital != null) {
            query = query + ' IsHospital = ' + IsHospital + ',';
        }
        if (hospitalname != `` && hospitalname != null) {
            query = query + ' hospitalname = ' + hospitalname + ',';
        }
        if (pxid != `` && pxid != null) {
            query = query + ' pxid = ' + pxid + ',';
        }
        if (clinicid != `` && clinicid != null) {
            query = query + ' clinicid = ' + clinicid + ',';
        }
        if (doctorid != `` && doctorid != null) {
            query = query + ' doctorid = ' + doctorid + ',';
        }
        if (apptid != `` && apptid != null) {
            query = query + ' apptid = ' + apptid + ',';
        }
        if (status != `` && status != null) {
            query = query + ' status = ' + status + ',';
        }
        if (TimeQueued != `` && TimeQueued != null) {
            query = query + ' TimeQueued = ' + TimeQueued + ',';
        }
        if (QueueDate != `` && QueueDate != null) {
            query = query + ' QueueDate = ' + QueueDate + ',';
        }
        if (StartTime != `` && StartTime != null) {
            query = query + ' StartTime = ' + StartTime + ',';
        }
        if (EndTime != `` && EndTime != null) {
            query = query + ' EndTime = ' + EndTime + ',';
        }
        if (type != `` && type != null) {
            query = query + ' type = ' + type + ',';
        }
        if (IsVirtual != `` && IsVirtual != null) {
            query = query + ' IsVirtual = ' + IsVirtual + ',';
        }
        if (mainspecialty != `` && mainspecialty != null) {
            query = query + ' mainspecialty = ' + mainspecialty + ',';
        }

        query = query + ' WHERE id = ' + id + ';';

        let pos = query.lastIndexOf(',');
        if (pos != -1) {
            query = query.substring(0, pos) + query.substring(pos + 1);
        }
        return query;
    },

    to_insert_query: function (pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate,
        StartTime, EndTime, type, IsVirtual, mainspecialty, hospitalname, IsHospital, City, Province, RegionName, patient_age, patient_gender, Location) {
        query = `INSERT INTO appointments (pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate, StartTime, EndTime, type, IsVirtual, mainspecialty, hospitalname, IsHospital, City, Province, RegionName, patient_age, patient_gender, Location)`
        query = query + ` VALUES ( ` + pxid + ` , ` + clinicid + ` , ` + doctorid + ` , ` + apptid + ` , ` + status + ` , ` + TimeQueued + ` , ` + QueueDate + ` , ` + StartTime + ` , ` + EndTime + ` , ` + type + ` ,` + IsVirtual + `, ` + mainspecialty + ` , ` + hospitalname + ` ,` + IsHospital + `, ` + City + ` , ` + Province + ` , ` + RegionName + ` , ` + patient_age + `, ` + patient_gender + ` , ` + Location + ` );`
        return query
    },

    for_update: function (id) {
        return 'SELECT * FROM appointments WHERE id=' + id + ' FOR UPDATE;'
    },

    to_insert_query_log_with_id: function (id, pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate, StartTime, EndTime, type, IsVirtual, mainspecialty, hospitalname, IsHospital, City, Province, RegionName, patient_age, patient_gender, Location) {
        let query = 'INSERT INTO log_table(t_type, isDone, id, pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate,';
        query = query + ' StartTime, EndTime, type, IsVirtual, mainspecialty, hospitalname, IsHospital, City, Province, RegionName, patient_age, patient_gender, Location) ';

        query = query + `VALUES('INSERT', False, ` + id + `, ` + pxid + `, ` + clinicid + `, ` + doctorid + `, ` + apptid + `, ` + status + `, ` + TimeQueued + `, ` + QueueDate + `, ` + StartTime + `, ` + EndTime + `, ` + type + `, ` + IsVirtual + `, ` + mainspecialty + `, ` + hospitalname + `, ` + IsHospital + `, ` + City + `, ` + Province + `,` + RegionName + `, ` + patient_age + `, ` + patient_gender + `, ` + Location + ``

        query = query + `); `;

        return query;
    },
    to_insert_query_log: function (pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate,
        StartTime, EndTime, type, IsVirtual, mainspecialty, hospitalname, IsHospital, City, Province, RegionName, patient_age, patient_gender, Location) {
        var query = 'INSERT INTO log_table(t_type, isDone, pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate,';
        query = query + 'StartTime, EndTime, type, IsVirtual, mainspecialty, hospitalname, IsHospital, City, Province, RegionName, patient_age, patient_gender, Location) ';


        query = query + `VALUES('INSERT', False,  ` + pxid + ` ,  ` + clinicid + ` ,  ` + doctorid + ` ,  ` + apptid + ` ,  ` + status + ` ,  ` + TimeQueued + ` ,  ` + QueueDate + ` ,  ` + StartTime + ` ,  ` + EndTime + ` ,  ` + type + ` , ` + IsVirtual + `,  ` + mainspecialty + ` ,  ` + hospitalname + ` , ` + IsHospital + `,  ` + City + ` ,  ` + Province + ` ,  ` + RegionName + ` , ` + patient_age + `,  ` + patient_gender + ` ,  ` + Location + ` `

        query = query + `); `;

        return query;
    },

    to_update_query_log: function (pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate,
        StartTime, EndTime, type, IsVirtual, mainspecialty, hospitalname, IsHospital, City, Province, RegionName, patient_age, patient_gender, Location) {
        var query = 'INSERT INTO log_table(t_type, isDone, id, pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate, ';
        query = query + 'StartTime, EndTime, type, IsVirtual, mainspecialty, hospitalname, IsHospital, City, Province, RegionName, patient_age, patient_gender, Location) ';

        query = query + `VALUES('UPDATE', False,  ` + pxid + ` ,  ` + clinicid + ` ,  ` + doctorid + ` ,  ` + apptid + ` ,  ` + status + ` ,  ` + TimeQueued + ` ,  ` + QueueDate + ` ,  ` + StartTime + ` ,  ` + EndTime + ` ,  ` + type + ` , ` + IsVirtual + `,  ` + mainspecialty + ` ,  ` + hospitalname + ` , ` + IsHospital + `,  ` + City + ` ,  ` + Province + ` ,  ` + RegionName + ` , ` + patient_age + `,  ` + patient_gender + ` ,  ` + Location + ` `

        query = query + `); `;

        return query;
    },
    to_update_query_log_with_id: function (id, pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate,
        StartTime, EndTime, type, IsVirtual, mainspecialty, hospitalname, IsHospital, City, Province, RegionName, patient_age, patient_gender, Location) {
        var query = 'INSERT INTO log_table(t_type, isDone, id, pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate, ';
        query = query + 'StartTime, EndTime, type, IsVirtual, mainspecialty, hospitalname, IsHospital, City, Province, RegionName, patient_age, patient_gender, Location) ';

        query = query + `VALUES('UPDATE', 0, ` + id + `,  ` + pxid + ` ,  ` + clinicid + ` ,  ` + doctorid + ` ,  ` + apptid + ` ,  ` + status + ` ,  ` + TimeQueued + ` ,  ` + QueueDate + ` ,  ` + StartTime + ` ,  ` + EndTime + ` ,  ` + type + ` , ` + IsVirtual + `,  ` + mainspecialty + ` ,  ` + hospitalname + ` , ` + IsHospital + `,  ` + City + ` ,  ` + Province + ` ,  ` + RegionName + ` , ` + patient_age + `,  ` + patient_gender + ` ,  ` + Location + ` `

        query = query + `); `;

        return query;
    },
    to_delete_query_log: function (id) {
        return 'INSERT INTO log_table(t_type, isDone, id) VALUES ("DELETE" , false, ' + id + ');';
    },
    to_finish_log: function (id) {
        return 'UPDATE log_table SET isDone=1 WHERE logid=' + id + ';';
    },
    to_retrieve_logs: function () {
        return `SELECT * FROM log_table
                WHERE isDone=false`
    },

}
module.exports = query_funcs;