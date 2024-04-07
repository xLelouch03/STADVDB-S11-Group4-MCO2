$(document).ready(function() {
    $('#example').DataTable({
        "ajax": "/data", // Endpoint to fetch data from
        "columns": [
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "age" },
            { "data": "start_date" },
            { "data": "salary" }
        ]
    });
});