$(document).ready(function() {
    $('#example').DataTable({
        "ajax": "/data",
        "scrollX": true,
        "scrollY": '30vw',
        "lengthMenu": [10, 100, 1000, 10000], 
        "columns": [
            { "data": "id" },
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

    var typingTimer;
    var doneTypingInterval = 1000; // 1 second

    $('#example_filter input').keyup(function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(performSearch, doneTypingInterval);
    });

    $('#example_filter input').keydown(function(event) {
        if (event.keyCode === 13) {
            clearTimeout(typingTimer);
            performSearch();
        }
    });

    function performSearch() {
        var searchTerm = $('#example_filter input').val();
        table.search(searchTerm).draw();
    }
});