'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errValidityMap = {
    'valueMissing': '_err_required',
    'patternMismatch': '_err_pattern',
    'typeMismatch': '_err_type',
    'rangeOverflow': '_err_max_value',
    'rangeUnderflow': '_err_min_value',
    'stepMismatch': '_err_step',
    'tooLong': '_err_max_length',
    'tooShort': '_err_min_length'
};

function isInputElement(element) {
    return element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA' || element.nodeName === 'SELECT';
}

var Validator = function () {
    function Validator(form) {
        var _this = this;

        _classCallCheck(this, Validator);

        this._form = form;
        this._formInputs = Array.from(this._form.elements).filter(isInputElement);

        this._formInputs.forEach(function (field) {
            _this.hideFieldErrors(field);
            field.addEventListener('input', function (e) {
                _this.validateField(field);
            });
        });
    }

    _createClass(Validator, [{
        key: 'validateForm',
        value: function validateForm() {
            var _this2 = this;

            var isValid = true;

            this._formInputs.forEach(function validateInput(field) {
                if (!field.checkValidity()) {
                    isValid = false;
                }
            });

            if (!isValid) {
                this._formInputs.forEach(function (field) {
                    _this2.validateField(field);
                });
            }

            return isValid;
        }
    }, {
        key: 'validateField',
        value: function validateField(field) {
            this.hideFieldErrors(field);
            field.classList.remove('error-input');
            var isNotValid = Object.keys(errValidityMap).find(function showError(errorType) {
                var error = form.getElementsByClassName('' + field.name + errValidityMap[errorType])[0];
                if (field.validity[errorType] && error) {
                    error.style.display = 'inline-block';
                    return true;
                }
                return false;
            });

            if (isNotValid) {
                field.classList.add('error-input');
                return false;
            }

            return true;
        }
    }, {
        key: 'hideFieldErrors',
        value: function hideFieldErrors(field) {
            Object.values(errValidityMap).forEach(function hideError(errorType) {
                var error = form.getElementsByClassName('' + field.name + errorType)[0];
                if (error) {
                    error.style.display = 'none';
                }
            });
        }
    }, {
        key: 'hideAllErrors',
        value: function hideAllErrors() {
            this._formInputs.forEach(hideFieldErrors);
        }
    }]);

    return Validator;
}();