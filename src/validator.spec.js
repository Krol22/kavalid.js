var Validator = require('./validator.js');

describe('Validator', function() {
    var fakeElement_1 = {
        name: 'fake-element-1',
        nodeName: 'INPUT',
        classList: { add: function() {}, remove: function() {} },
        addEventListener: function() {},
        checkValidity: function() {},
        validity: {}
    };

    var fakeElement_2 = {
        name: 'fake-element-2',
        nodeName: 'INPUT',
        classList: { add: function() {}, remove: function() {} },
        addEventListener: function() {},
        checkValidity: function() {},
        validity: {} 
    }

    var fakeForm = {
        getElementsByClassName: function(){ return []; },
        elements: [ fakeElement_1, fakeElement_2 ]
    };

    var validator;

    beforeEach(function() {
        validator = new Validator(fakeForm);
    });

    it('should be defined', function() {
        expect(Validator).toBeDefined();
    });

    describe('construct', function() {
        it('should save form to _form variable', function() {
            expect(validator._form).toEqual(fakeForm);
        });

        it('should hide errors for each element in form', function() {
            spyOn(Validator.prototype, 'hideFieldErrors');

            new Validator(fakeForm);

            expect(Validator.prototype.hideFieldErrors).toHaveBeenCalledWith(fakeForm.elements[0]);
        });

        it('should add event listener for each input element in form', function() {
            spyOn(fakeElement_1, 'addEventListener');

            new Validator(fakeForm);

            expect(fakeElement_1, jasmine.any(Function));
        });
    });

    describe('validateForm', function() {

        beforeEach(function() {
            spyOn(validator, 'validateField');
        });

        it('should return false when form is invalid (no custom rules)', function() {
            spyOn(fakeElement_1, 'checkValidity').and.returnValue(false);
            spyOn(fakeForm.elements[1], 'checkValidity').and.returnValue(true);

            var isValid = validator.validateForm();

            expect(isValid).toBe(false);
        });

        it('should return true when form is valid (no custom rules)', function() {
            spyOn(fakeElement_1, 'checkValidity').and.returnValue(true);
            spyOn(fakeElement_2, 'checkValidity').and.returnValue(true);

            var isValid = validator.validateForm();

            expect(isValid).toBe(true);
        });

        it('should return false when form is invalid (custom rules)', function() {
            spyOn(fakeElement_1, 'checkValidity').and.returnValue(true);
            spyOn(fakeElement_2, 'checkValidity').and.returnValue(true);

            validator._customRules = [
                function(field) { return true; }
            ];

            var isValid = validator.validateForm();

            expect(isValid).toBe(false);
        });

        it('should return true when form is valid (custom rules)', function() {
            spyOn(fakeElement_1, 'checkValidity').and.returnValue(true);
            spyOn(fakeElement_2, 'checkValidity').and.returnValue(true);

            validator._customRules = [
                function(field) { return false; }
            ];

            var isValid = validator.validateForm();

            expect(isValid).toBe(true);

        });

        it('should check validity on each field in form', function() {
            spyOn(fakeElement_1, 'checkValidity').and.returnValue(true);
            spyOn(fakeElement_2, 'checkValidity');

            validator.validateForm();

            expect(fakeElement_1.checkValidity).toHaveBeenCalled();
            expect(fakeElement_2.checkValidity).toHaveBeenCalled();
        });

        it('should check validity on each field in form with custom rules', function() {
            spyOn(fakeElement_1, 'checkValidity').and.returnValue(true);
            spyOn(fakeElement_2, 'checkValidity').and.returnValue(true);
        });

        it('should call validate field function when form is invalid', function() {
            validator.validateForm();

            expect(validator.validateField).toHaveBeenCalledWith(fakeElement_1);
            expect(validator.validateField).toHaveBeenCalledWith(fakeElement_2);
        });
    });

    describe('validateField', function() {

        var fakeError = {
            style: { display: '' }
        };

        beforeEach(function() {
            spyOn(validator, 'hideFieldErrors');
            spyOn(validator._form, 'getElementsByClassName').and.returnValue([ fakeError ]);

            fakeElement_1.validity['valueMissing'] = false;
            fakeElement_1.validity['patternMismatch'] = false;
            fakeElement_1.validity['typeMismatch'] = false;
            fakeElement_1.validity['rangeOverflow'] = false;
            fakeElement_1.validity['rangeUnderflow'] = false;
            fakeElement_1.validity['stepMismatch'] = false;
            fakeElement_1.validity['tooLong'] = false;
            fakeElement_1.validity['tooShort'] = false;
        });

        it('should hide all errors on field', function() {
            validator.validateField(fakeElement_1);

            expect(validator.hideFieldErrors).toHaveBeenCalledWith(fakeElement_1);
        });


        it('should remove class "error-input" from field element', function() {
            spyOn(fakeElement_1.classList, 'remove');
            validator.validateField(fakeElement_1);

            expect(fakeElement_1.classList.remove).toHaveBeenCalledWith('error-input');
        });

        it('should return false if field is not valid', function() {
            fakeElement_1.validity['rangeUnderflow'] = true;

            var isValid = validator.validateField(fakeElement_1);

            expect(isValid).toBe(false);
        });

        it('should return false if field is not valid (custom rule check)', function() {
            validator._customRules['rangeUnderflow'] = function(field) {
                return false;
            }

            spyOn(validator._customRules, 'rangeUnderflow').and.callThrough();

            var isValid = validator.validateField(fakeElement_1);

            expect(isValid).toBe(false);
        });

        it('should show error and add "error-input" class to field when it is invalid', function() {
            spyOn(fakeElement_1.classList, 'remove');
            fakeElement_1.validity['tooShort'];

            validator.validateField(fakeElement_1);

            expect(fakeError.style.display).toBe('inline-block');
            expect(fakeElement_1.classList.remove).toHaveBeenCalledWith('error-input');
        });

        it('should return true if field is valid', function() {
            var isValid = validator.validateField(fakeElement_1);

            expect(isValid).toBe(true);
        });
    });

    describe('hideFieldErrors', function() {
        it('should remove "error-input" from field', function() {
            spyOn(fakeElement_1.classList, 'remove');

            validator.hideFieldErrors(fakeElement_1);

            expect(fakeElement_1.classList.remove).toHaveBeenCalledWith('error-input');
        });

        it('should hide all error for field', function() {
            var fakeError_1 = { style: { display: 'block' } }, 
                fakeError_2 = { style: { display: 'block' } }

            spyOn(fakeForm, 'getElementsByClassName').and.callFake(function(string) {
                if(string === 'fake-element-1_err_required') {
                    return [fakeError_1];
                } else if(string === 'fake-element-1_err_type') {
                    return [fakeError_2];
                } else {
                    return [];
                }
            });

            validator.hideFieldErrors(fakeElement_1);

            expect(fakeError_1.style.display).toBe('none');
            expect(fakeError_2.style.display).toBe('none');
        });
    });

    describe('hideAllErrors', function() {
        it('should call hideFieldErrors function on each form field', function() {
            spyOn(validator, 'hideFieldErrors');

            validator.hideAllErrors();

            expect(validator.hideFieldErrors).toHaveBeenCalledWith(fakeElement_1);
            expect(validator.hideFieldErrors).toHaveBeenCalledWith(fakeElement_2);
        });
    });

    describe('addCustomRule', function() {

        it('should throw error when custom rule with same name is already defined', function() {
            var existingCustomRule = {
                name: 'test_1',
                validator: function() {} 
            };

            var newCustomRule = {
                name: 'test_1',
                validator: function() {} 
            };

            validator.addCustomRule(existingCustomRule);

            expect(function() { validator.addCustomRule(newCustomRule); }).toThrow(new Error('Custom validator named test_1 is already defined!'));
        });


        it('should add custom rule validation function to _customRules array', function() {
            var newCustomRule = {
                name: 'test_1',
                validator: function() {} 
            };

            validator.addCustomRule(newCustomRule);

            expect(validator._customRules['test_1']).toEqual(newCustomRule.validator);
        });

    });
});
