fetch(`/getReport`)  
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const dataArray = data[Object.keys(data)[0]];

    console.log(dataArray[0].total_appointments);
    console.log(dataArray[1].total_appointments);
    console.log(dataArray[2].total_appointments);
    
    document.getElementById('luzon-appointments').textContent = dataArray[0].total_appointments;
    document.getElementById('visayas-appointments').textContent = dataArray[1].total_appointments;
    document.getElementById('mindanao-appointments').textContent = dataArray[2].total_appointments;
    
  })
  .catch(error => {
    console.error('Error:', error);
});