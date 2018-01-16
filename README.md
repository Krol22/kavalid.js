# VaidatorJS  

Simple library for validating forms with HTML5 validators. Now supports also custom validation rules.

Dependencies: **none**,

Usage: 

* install it by downloading directly from github

* html

```html
    <form id="form">
        <input name="first_input" required/>
        <div class="error first_input_err_required">Error message</div>
    </form>
```

Message has to have an error class and 'input\_name + \_err_type' class. If you want to style input with an error just modify .error-input class.

* js

```javascript
    var form = document.querySelectorAll('#form');

    var formValidator = new Validator(form); // automaticly hides all '${field_name}${err_type}'
```

Error types: 

* \_err_required
* \_err_pattern
* \_err_type
* \_err\_max_value
* \_err\_min_value
* \_err\_step
* \_err\_max\_length
* \_err\_min\_length

API: 

* validateForm( ) : _boolean_ 

* validateField(field) : _boolean_

* hideFieldErrors(field) : _void_

* hideAllErrors( ) : _void_

* addCustomRule(newCustomRule) : _void_

Custom rules: 

Use method *addCustomRule* to add new rule to your validator. It takes object 

```javascript
    {
        name, // validation rule name, it's used later in showing/hiding error messages,
        validator, // validate function; it should return true when field is valid else it should return false
    }

```

as a parameter.

Example rule: 

```html
    <form id="form">
        <div>
            <label for="password">Password</label>
            <input name="password" type="password"/>
        </div>
        <div class="col">
            <label for="password">Confirm password</label>
            <input name="password_confirm" type="password"/>
            <div class="error password_confirm_err_confirm_password"> Passwords doesn't match. </div>
        </div>
    </form>
```

```javascript
    var form = document.querySelector('#form');
    var formValidator = new Validator(form);

    formValidator.addCustomRule({
        name: 'confirm_password',
        validator: function(input) {
            if(input.name === 'password_confirm') {
                var passwordInput = form.querySelector('input[name="password"]');
                return passwordInput.value === input.value;
            }

            return true;
        };
    })
```


## [DEMO](https://krol22.github.io/kavalid.js)
