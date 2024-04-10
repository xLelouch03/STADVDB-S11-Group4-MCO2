fetch(`/getReport`)  
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
    
    document.getElementById('luzon-appointments').value = dataArray[0].apptid;
    document.getElementById('visayas-appointments').value = dataArray[0].apptid;
    document.getElementById('mindanao-appointments').value = dataArray[0].apptid;
    
  })
  .catch(error => {
    console.error('Error:', error);
});