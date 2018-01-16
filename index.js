var form = document.querySelectorAll('#form_1')[0];
var submitButton = document.querySelectorAll('#submit_button')[0];
var cancelButton = document.querySelectorAll('#cancel_button')[0];
var successAlert = document.querySelectorAll('#success_alert')[0];
var dangerAlert = document.querySelectorAll('#danger_alert')[0];

var formValidator = new Validator(form);

formValidator.addCustomRule({
    name: 'confirm_password',
    validator: function(input) {
        if(input.name === 'field_password_confirm') {
            var passwdInput = form.querySelector('input[name="field_password"]');
            return passwdInput.value === input.value;
        } 
        return true;
    }
});

var fields = Array.from(form.elements);
fields[5].value = 1.1;

submitButton.addEventListener('click', function onClick(e) {
    e.preventDefault();
    if(formValidator.validateForm()){
        showSuccess();
    } else {
        hideSuccess();
    }
});

cancelButton.addEventListener('click', function onClick(e) {
    e.preventDefault();

    form.reset();
    fields[5].value = 1.1;
    successAlert.style.display = 'none';
    dangerAlert.style.display = 'none';
    formValidator.hideAllErrors();
});


function showSuccess() {
    successAlert.style.display = 'block'; 
    dangerAlert.style.display = 'none'; 
}

function hideSuccess() {
    dangerAlert.style.display = 'block'; 
    successAlert.style.display = 'none'; 

}
