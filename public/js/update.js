$(document).ready(function() {
    $('#pxage').on('input', function() {
        // Get the value entered by the user
        var inputVal = $(this).val();

        // Check if the value is less than or equal to 0
        if (inputVal <= 0) {
            // If negative or zero, reset the input to an empty string
            $(this).val('');
        }
    });
});