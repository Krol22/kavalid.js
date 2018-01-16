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
        this._customRules = {};
        this._form = form;
        this._formInputs = Array.from(this._form.elements).filter(isInputElement);

        this._formInputs
            .forEach((field) => {
                this.hideFieldErrors(field);
                field.addEventListener('input', (e) => { 
                    this.validateField(field);
                });
            });
    }

    validateForm() {
        var isValid = true;

        this._formInputs
            .some(function validateInput(field) {
                if(!field.checkValidity()) {
                    isValid = false;
                }

                return !isValid;
            });

        if(isValid) {
            this._formInputs.some((field) => { 
                isValid = !Array.from(this._customRules).find((rule) => {
                    return rule(field);
                });

                return !isValid;
            });
        }

        if(!isValid) {
            this._formInputs.forEach((field) => {
                this.validateField(field);
            });
        }

        return isValid;
    }

    validateField(field) {
        var error;
        this.hideFieldErrors(field);
        field.classList.remove('error-input');
        var isNotValid = Object
            .keys(errValidityMap)
            .some((errorType) => {
                error = this._form.getElementsByClassName(`${field.name}${errValidityMap[errorType]}`)[0];      
                if(field.validity[errorType] && error) {
                    return true;
                } else if (this._customRules[errorType] && error) {
                    return !this._customRules[errorType](field);
                }
                return false;
            });

        if(isNotValid) {
            error.style.display = 'inline-block';
            field.classList.add('error-input');
            return false;
        }

        return true;
    }

    hideFieldErrors(field) {
        field.classList.remove('error-input');
        Object
            .values(errValidityMap)
            .forEach((errorType) => {
                var error = this._form.getElementsByClassName(`${field.name}${errorType}`)[0];
                if(error) {
                    error.style.display = 'none';
                }
            });
    }

    hideAllErrors() {
        this._formInputs.forEach((field) => { this.hideFieldErrors(field); });
    }

    addCustomRule(newCustomRule) {
        if(this._customRules[newCustomRule.name]) {
            throw new Error(`Custom validator named ${newCustomRule.name} is already defined!`);
        }

        this._customRules[newCustomRule.name] = newCustomRule.validator;
        errValidityMap[newCustomRule.name] = `_err_${newCustomRule.name}`;
    }

}