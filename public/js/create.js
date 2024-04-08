document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get form data
    var formData = {
        PxID: document.querySelectorAll('.form-control')[1].value,
        ClinicID: document.querySelectorAll('.form-control')[2].value,
        DoctorID: document.querySelectorAll('.form-control')[3].value,
        ApptID: document.querySelector('#apptid').value,
        Status: document.querySelector('#status').value,
        TimeQueued: document.querySelector('#tq').value,
        QueueDate: document.querySelector('#qd').value,
        StartTime: document.querySelector('#st').value,
        EndTime: document.querySelector('#et').value,
        Type: document.querySelector('#type').value,
        Virtual: document.querySelector('#virtual').value,
        MainSpecialty: document.querySelector('#ms').value,
        HospitalName: document.querySelector('#hn').value,
        IsHospital: document.querySelector('#ishospital').value,
        City: document.querySelector('#city').value,
        Province: document.querySelector('#province').value,
        RegionName: document.querySelector('#regionname').value,
        PatientAge: document.querySelector('#pxage').value,
        PatientGender: document.querySelector('#pxgender').value,
    };

    // Convert form data to JSON
    var jsonData = JSON.stringify(formData);

    // Write JSON data to a file (You may need server-side code to handle this)
    console.log(jsonData);

    document.querySelector('form').reset();

});