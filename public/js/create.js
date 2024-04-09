document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    let region = document.querySelector('#regionname').value;
    let island

    if(region == 'Ilocos Region (I)' || region == 'Cagayan Valley (II)' || region == 'Central Luzon (III)' || region == 'CALABARZON (IV-A)' || region == 'MIMAROPA (IV-B)' || region == 'Bicol Region (V)' || region == 'Cordillera Administrative Region (CAR)' || region == 'National Capital Region (NCR)' || region == 'MIMAROPA') {
        island = 'Luzon';
    }
    else if(region == 'Western Visayas (VI)' || region == 'Central Visayas (VII)' || region == 'Eastern Visayas (VIII)') {
        island = 'Visayas';
    }
    else if(region == 'Zamboanga Peninsula (IX)' || region == 'Northern Mindanao (X)' || region == 'Davao Region (XI)' || region == 'SOCCSKSARGEN (Cotabato Region) (XII)' || region == 'Caraga (XIII)' || region == 'Bangsamoro (BARMM)') {
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
        Location: return_null(island)
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
        console.log("hellooo")
        console.log(response)
        if (!response.ok) {
            alert('Error creating appointment')
            throw new Error('Network response was not ok');
        }
        alert('Appintment created successfully')
        return response.json();
    });

    document.querySelector('form').reset();

});