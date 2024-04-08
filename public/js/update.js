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