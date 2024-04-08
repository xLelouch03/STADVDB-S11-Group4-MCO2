document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    let region = document.querySelector('#regionname').value;
    let island

    if(region == 'Region I' || region == 'Region II' || region == 'Region III' || region == 'Region IV-A' || region == 'Region IV-B' || region == 'Region V' || region == 'Region CAR' || region == 'NCR' || region == 'MIMAROPA') {
        island = 'Luzon';
    }
    else if(region == 'Region VI' || region == 'Region VII' || region == 'Region VIII') {
        island = 'Visayas';
    }
    else if(region == 'Region IX' || region == 'Region X' || region == 'Region XI' || region == 'Region XII' || region == 'Region XIII' || region == 'BARMM') {
        island = 'Mindanao';
    }
    else island = null;

    let virtual;
    if (document.querySelector('#virtual').value == 'True') {
        virtual = 1;
    }
    else if (document.querySelector('#virtual').value == 'False') {
        virtual = 0;
    }
    else virtual = null;

    function return_null(value) {
        if (value === 'Choose...' || value === '') {
            return null;
        }
        else return "'" + value + "'";
    }
    
    function return_null_int(value) {
        if (value == '') {
            return null;
        }
        else return value;
    }
    console.log("Type value:", document.querySelector('#type').value);

    var formData = {
        pxid: return_null(document.querySelectorAll('.form-control')[1].value),
        clinicid: return_null(document.querySelectorAll('.form-control')[2].value),
        doctorid: return_null(document.querySelectorAll('.form-control')[3].value),
        apptid: return_null(document.querySelector('#apptid').value),
        status: return_null(document.querySelector('#status').value),
        TimeQueued: return_null(document.querySelector('#tq').value),
        QueueDate: return_null(document.querySelector('#qd').value),
        StartTime: return_null(document.querySelector('#st').value),
        EndTime: return_null(document.querySelector('#et').value),
        type: return_null(document.querySelector('#type').value),
        IsVirtual: virtual,
        mainspecialty: return_null(document.querySelector('#ms').value),
        hospitalname: return_null(document.querySelector('#hn').value),
        IsHospital: return_null(document.querySelector('#ishospital').value),
        City: return_null(document.querySelector('#city').value),
        Province: return_null(document.querySelector('#province').value),
        RegionName: return_null(region),
        patient_age: return_null_int(document.querySelector('#pxage').value),
        patient_gender: return_null(document.querySelector('#pxgender').value),
        Location: island
    };

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