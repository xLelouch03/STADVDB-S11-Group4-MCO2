document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('id').addEventListener('input', function() {
        var inputVal = this.value;

        if (inputVal <= 0) {
            this.value = '';
        }

    });

    // Select the form using document.querySelector('form') or document.getElementsByTagName('form')[0]
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Get the value of the id input field
        var id = document.getElementById('id').value;

        // Construct the URL with the id parameter
        var url = "/update/" + id;

        // Redirect the page to the constructed URL
        window.location.href = url;
    });
});