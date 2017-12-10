# VaidatorJS  

Simple library for validating forms with HTML5 validations.

Dependencies: **none**,

Usage: 

* install download directly from github

* html

Pattern for error is - ${inputName} + ${errorType}

```html
    <form id="#form">
        <input name="first_input" required/>
        <div class="error first_input_err_required"/>
    </form>
```

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

## [DEMO](https://krol22.github.io/validatorJs)
