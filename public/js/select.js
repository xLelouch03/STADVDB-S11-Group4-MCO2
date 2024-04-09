document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('id').addEventListener('input', function() {
        var inputVal = this.value;

        if (inputVal <= 0) {
            this.value = '';
        }

    });

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        var id = document.getElementById('id').value;

        var url = "/update/" + id;

        fetch('/select', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => {
            if (!response.ok) {
                alert('There are no appointments with that ID')
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            window.location.href = url;
        });

        
    });
});