$(document).ready(function() {
    $('#example').DataTable({
        "ajax": "/data",
        "scrollX": true,
        "scrollY": '30vw',
        "searching": true,
        "lengthMenu": [10, 100, 1000, 10000], 
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
            { 
                "data": "IsVirtual",
                "render": function(data, type, row) {
                    return data == 1 ? "True" : "False";
                }
            },
            { "data": "mainspecialty" },
            { "data": "hospitalname" },
            { "data": "IsHospital" },
            { "data": "City" },
            { "data": "Province" },
            { "data": "RegionName" },
            { "data": "patient_age" },
            { "data": "patient_gender" },
            { "data": "Location" }
        ]
    });
});