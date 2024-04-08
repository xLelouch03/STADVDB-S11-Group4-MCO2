document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    var formData = {
        pxid: document.querySelectorAll('.form-control')[1].value,
        clinicid: document.querySelectorAll('.form-control')[2].value,
        doctorid: document.querySelectorAll('.form-control')[3].value,
        apptid: document.querySelector('#apptid').value,
        status: document.querySelector('#status').value,
        TimeQueued: document.querySelector('#tq').value,
        QueueDate: document.querySelector('#qd').value,
        StartTime: document.querySelector('#st').value,
        EndTime: document.querySelector('#et').value,
        type: document.querySelector('#type').value,
        IsVirtual: document.querySelector('#virtual').value,
        mainspecialty: document.querySelector('#ms').value,
        hospitalname: document.querySelector('#hn').value,
        IsHospital: document.querySelector('#ishospital').value,
        City: document.querySelector('#city').value,
        Province: document.querySelector('#province').value,
        RegionName: document.querySelector('#regionname').value,
        patient_age: document.querySelector('#pxage').value,
        patient_gender: document.querySelector('#pxgender').value,
    };

    for (const key in formData) {
        if (formData[key] == '') {
            formData[key] = null;
        }
    }

    var jsonData = JSON.stringify(formData);

    console.log(jsonData);

    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
    .then(response => {
        if (!response.data.status) {
            alert('Error inserting')
            throw new Error('Network response was not ok');
        }
        alert('Data inserted successfully')
        return response.json();
    });
    
    document.querySelector('form').reset();

});