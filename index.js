var form = document.querySelectorAll('#form_1')[0];
var button = document.querySelectorAll('#submit_button')[0];
var successAlert = document.querySelectorAll('#success_alert')[0];
var dangerAlert = document.querySelectorAll('#danger_alert')[0];

var formValidator = new Validator(form);

var fields = Array.from(form.elements);
fields[5].value = 1.1;

button.addEventListener('click', function onClick(e) {
    e.preventDefault();
    if(formValidator.validateForm()){
        showSuccess();
    } else {
        hideSuccess();
    }
});

function showSuccess() {
    successAlert.style.display = 'block'; 
    dangerAlert.style.display = 'none'; 
}

function hideSuccess() {
    dangerAlert.style.display = 'block'; 
    successAlert.style.display = 'none'; 

}
