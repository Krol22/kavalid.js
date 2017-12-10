# VaidatorJS  

Simple library for validating forms with HTML5 validations.

Dependencies: **none**,

Usage: 

* install download directly from github

* html

```html
    <form id="#form">
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

## [DEMO](https://krol22.github.io/validator-html/)
