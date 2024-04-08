var url = window.location.href;

var parts = url.split('/');

var id = parts[parts.length - 1];

fetch(`/get/${id}`)  
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('JSON data:', data);
    const dataArray = data[Object.keys(data)[0]]; 
    console.log('First element of the array:', dataArray[0]);
    
    document.getElementById('apptid').value = dataArray[0].apptid;
    document.querySelectorAll('.form-control')[1].value = dataArray[0].pxid;
    document.querySelectorAll('.form-control')[2].value = dataArray[0].clinicid;
    document.querySelectorAll('.form-control')[3].value = dataArray[0].doctorid;
    document.getElementById('status').value = dataArray[0].status;
    document.getElementById('tq').value = dataArray[0].TimeQueued.slice(0, -5);
    document.getElementById('qd').value = dataArray[0].QueueDate.slice(0, -5);
    document.getElementById('st').value = dataArray[0].StartTime.slice(0, -5);
    document.getElementById('et').value = dataArray[0].EndTime.slice(0, -5);
    document.getElementById('type').value = dataArray[0].type;
    if (dataArray[0].IsVirtual == 1) {
      document.getElementById('virtual').value = "True";
    }
    else { 
      document.getElementById('virtual').value = "False";
    }    
    document.getElementById('ms').value = dataArray[0].mainspecialty;
    document.getElementById('hn').value = dataArray[0].hospitalname;
    document.getElementById('ishospital').value = dataArray[0].IsHospital;
    document.getElementById('city').value = dataArray[0].City;
    document.getElementById('province').value = dataArray[0].Province;
    document.getElementById('regionname').value = dataArray[0].RegionName;
    document.getElementById('pxage').value = dataArray[0].patient_age;
    
    if (dataArray[0].patient_gender == "MALE" ) {
      document.getElementById('pxgender').value = "Male"
    }
    else {
      document.getElementById('pxgender').value = "Female"
    }
  })
  .catch(error => {
    console.error('Error:', error);
});

const editButton = document.querySelector('.btn-dark');
editButton.addEventListener('click', function(event) {
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

    fetch(`/update/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData
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

const deleteButton = document.querySelector('.btn-danger');
deleteButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    fetch(`/delete/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.data.status) {
            alert('Error inserting')
            throw new Error('Network response was not ok');
        }
        alert('Data inserted successfully')
        return response.json();
    });
});