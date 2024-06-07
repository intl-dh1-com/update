/**
 * Polyfills
 **/
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i,
                el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) {};
            } while ((i < 0) && (el = el.parentElement));
            return el;
        };
}

var isEmployee = false;

// Functions
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Listeners
document.addEventListener('DOMContentLoaded', function() {
    var floatField = document.getElementsByClassName('form-group');
    var lastId = -1;
    for (i = 0; i < floatField.length; i++) {
        if (i === 0) {
            floatField[i].classList.add('radius-form-group-first');
            floatField[i].classList.add('active');
        }
        var tmpEl = floatField[i].getElementsByTagName('input');
        if (tmpEl.length > 0 && ['text', 'password'].indexOf(tmpEl[0].getAttribute('type')) > -1) {
            lastId = i;
        }

        if (floatField[i].querySelector('input').value.length > 0) {
            floatField[i].classList.add('active');
        }
        floatField[i].querySelector('input').addEventListener('focus', function(e) {
            e.target.closest(".form-group").classList.add('active');
        });
        floatField[i].querySelector('input').addEventListener('blur', function(e) {
            if (e.target.value.length === 0) {
                e.target.closest(".form-group").classList.remove('active');
            }
        });
    }

    if (lastId > -1) {
        floatField[lastId].classList.add('radius-form-group-last');
    }

    var azure = document.getElementById('zocial-microsoft');
    if (azure) {
        azure.addEventListener('click', function(e) {
            e.preventDefault();
            var href = document.getElementById('zocial-microsoft').getAttribute('href');
            var email = document.getElementById('username').value;
            href = href + (href.indexOf('?') > 0 ? '&' : '?') + 'login_hint=' + encodeURIComponent(email);
            window.location = href;
            return false;
        });
    }

    // Validators
    var fields = document.getElementsByTagName('input');
    for (i = 0; i < fields.length; i++) {
        if (fields[i].getAttribute('data-validate') === 'email') {
            fields[i].addEventListener('input', function(e) {
                if (validateEmail(e.target.value)) {
                    e.target.closest(".form-group").classList.remove('invalid');
                    e.target.closest(".form-group").classList.add('valid');
                } else {
                    e.target.closest(".form-group").classList.remove('valid');
                    e.target.closest(".form-group").classList.add('invalid');
                }
            });
        }

        if (fields[i].getAttribute('data-email') === 'employee') {
            fields[i].addEventListener('input', function(e) {
                if (isEmailInternal(e.target.value)) {
                    var els = document.querySelectorAll('[data-dhl-employee], #kc-login');
                    for (var i2 = 0; i2 < els.length; i2++) {
                        if (els[i2].getAttribute('data-dhl-employee') === 'show') {
                            els[i2].style.display = 'block';
                        } else if (els[i2].getAttribute('data-dhl-employee') === 'hide') {
                            els[i2].style.display = 'none';
                        } else if (els[i2].getAttribute('data-dhl-employee') === 'disable') {
                            if (!els[i2].classList.contains('disabled')) {
                                els[i2].classList.add('disabled');
                                disableInputs([els[i2]], true);
                                disableInputs(els[i2].getElementsByTagName('input'), true);
                            }
                        } else if (els[i2].id === 'kc-login') {
                            document.getElementById('kc-login').value = document.getElementById('input-provider-microsoft').getAttribute('data-title');
                        }
                    }
                    isEmployee = true;
                } else {
                    var els = document.querySelectorAll('[data-dhl-employee], #kc-login');
                    for (var i2 = 0; i2 < els.length; i2++) {
                        if (els[i2].getAttribute('data-dhl-employee') === 'show') {
                            els[i2].style.display = 'none';
                        } else if (els[i2].getAttribute('data-dhl-employee') === 'hide') {
                            els[i2].style.display = 'block';
                        } else if (els[i2].getAttribute('data-dhl-employee') === 'disable') {
                            if (els[i2].classList.contains('disabled')) {
                                els[i2].classList.remove('disabled');
                                disableInputs([els[i2]], false);
                                disableInputs(els[i2].getElementsByTagName('input'), false);
                            }
                        } else if (els[i2].id === 'kc-login') {
                            var inputProvider = document.getElementById('input-provider-microsoft');
                            if (inputProvider) {
                                document.getElementById('kc-login').value = inputProvider.getAttribute('data-title-login');
                            }
                        }
                    }
                    isEmployee = false;
                }
            });
        }
    }

    var showHidePasswordButtons = document.getElementsByClassName("show-hide-password");
    for (i = 0; i < showHidePasswordButtons.length; i++) {
        showHidePasswordButtons[i].addEventListener('click', function(event) {
            event.stopPropagation();
            showPassword(this);
        });
    }

    var inputEmails = document.getElementsByClassName("reset-password-input-email");
    if (inputEmails[0]) {
        inputEmails[0].addEventListener('input', function(event) {
            validEmailForResetPassword(event.target.value);
        })
    }
}, false);

function disableInputs(inputs, disable) {
    if (disable) {
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute('disabled', 'disabled');
            if (inputs[i].getAttribute('type') === 'password') {
                inputs[i].value = '*****';
            }
        }
    } else {
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeAttribute('disabled');
            if (inputs[i].getAttribute('type') === 'password') {
                inputs[i].value = '';
            }
        }
    }
}

function showPassword(field) {
    if (!field.classList.contains('active')) {
        field.classList.add('active');
        field.parentElement.firstElementChild.type = 'text'; //find the input through a parent and set value
    } else {
        field.classList.remove('active');
        field.parentElement.firstElementChild.type = 'password'; //find the input through a parent and set value
    }
}

function isEmailInternal(email) {
    return /@(dhl\.com|dpdhl\.com)\s*$/i.test(email);
}

function validEmailForResetPassword(email) {
    if (validateEmail(email)) {
        document.getElementById('reset-password-alert-error').style.display = 'none';
        if (isEmailInternal(email)) {
            var els = document.querySelectorAll('[data-dhl-employee], #kc-login');
            for (var i2 = 0; i2 < els.length; i2++) {
                els[i2].style.display = 'block';
                els[i2].classList.add('disabled');
            }
            return false;
        }
        return true;
    }

    document.getElementById('reset-password-alert-error').style.display = 'block';
    return false;
}

function onSubmitResetPassword() {
    var resetPasswordInputs = document.getElementsByClassName("reset-password-input-email");
    if (resetPasswordInputs) {
        return validEmailForResetPassword(resetPasswordInputs[0].value);
    }

    return false;
}

function onSubmitLogin(form) {
    if (isEmployee) {
        form.action = document.getElementById('input-provider-microsoft').getAttribute('data-url');
    }
    return true;
}
