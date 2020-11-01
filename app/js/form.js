document.addEventListener("DOMContentLoaded", function() {

    let hidePasswordFlag = false;

    document.querySelector('.form__show-password-button').addEventListener('click', event => {

        event.preventDefault()
        const showPasswordbutton = event.target.closest('.form__show-password-button')
        const passwordInput = showPasswordbutton.previousElementSibling 

        if(hidePasswordFlag) {
            passwordInput.type = "password"
            showPasswordbutton.setAttribute("aria-label", 'pokaż hasło')
        }
        else {
            passwordInput.type = "text"
            showPasswordbutton.setAttribute("aria-label", 'ukryj hasło')
        }

        hidePasswordFlag = !hidePasswordFlag
    });

    document.querySelector('#login-submit').addEventListener('click', validateForm)
    document.querySelector('#register-submit').addEventListener('click', validateForm)


});

function validateForm(event) {
    event.preventDefault();
    const formContainer = event.target.parentNode;
    const formValidity = formContainer.checkValidity();

    console.log(formValidity);

    formContainer.classList.add('form__validate')
}