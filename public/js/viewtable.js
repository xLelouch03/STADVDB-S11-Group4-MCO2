$(document).ready(function() {
    $('#example').DataTable({
        "ajax": "/data", // Endpoint to fetch data from
        "columns": [
            { "data": "pxid" },
            { "data": "clinicid" },
            { "data": "doctorid" },
            { "data": "apptid" },
            { "data": "status" },
            { "data": "TimeQueued" },
            { "data": "QueueDate" },
            { "data": "StartTime" },
            { "data": "EndTime" },
            { "data": "type" },
            { "data": "Virtual" },
            { "data": "mainspecialty" },
            { "data": "hospitalname" },
            { "data": "IsHospital" },
            { "data": "City" },
            { "data": "Province" },
            { "data": "RegionName" },
            { "data": "patient_age" },
            { "data": "patient_gender" }
        ]
    });
});