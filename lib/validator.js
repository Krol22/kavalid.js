const errValidityMap = {
    'valueMissing': '_err_required',
    'patternMismatch': '_err_pattern',
    'typeMismatch': '_err_type',
    'rangeOverflow': '_err_max_value',
    'rangeUnderflow': '_err_min_value',
    'stepMismatch': '_err_step',
    'tooLong': '_err_max_length',
    'tooShort': '_err_min_length'
}

function isInputElement(element) {
    return element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA' || element.nodeName === 'SELECT'
}

class Validator {
    constructor(form) {
        this._form = form;
        this._formInputs = Array.from(this._form.elements).filter(isInputElement);

        this._formInputs
            .forEach((field) => {
                this.hideFieldErrors(field);
                field.addEventListener('input', (e) => { 
                    this.validateField(field);
                });
            });
    };

    validateForm() {
        var isValid = true;

        this._formInputs
            .forEach(function validateInput(field) {
                if(!field.checkValidity()) {
                    isValid = false;
                }
            });

        if(!isValid) {
            this._formInputs.forEach((field) => {
                this.validateField(field);
            });
        }

        return isValid;
    };

    validateField(field) {
        this.hideFieldErrors(field);
        field.classList.remove('error-input');
        var isNotValid = Object
            .keys(errValidityMap)
            .find(function showError(errorType){
                var error = form.getElementsByClassName(`${field.name}${errValidityMap[errorType]}`)[0];      
                if(field.validity[errorType] && error) {
                    error.style.display = 'inline-block';
                    return true;
                }
                return false;
            });
        
        if(isNotValid) {
            field.classList.add('error-input');
            return false;
        }

        return true;
    };

    hideFieldErrors(field) {
        Object
            .values(errValidityMap)
            .forEach(function hideError(errorType) {
                var error = form.getElementsByClassName(`${field.name}${errorType}`)[0];
                if(error) {
                    error.style.display = 'none';
                }
            });
    };

    hideAllErrors() {
        this._formInputs.forEach(hideFieldErrors);
    };

}