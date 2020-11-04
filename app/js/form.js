document.addEventListener("DOMContentLoaded", function() {

    let hidePasswordFlag = false;

    const showPasswordButtonsList = document.querySelectorAll('.form__show-password-button')
    const formContainer = document.querySelector('.form__container')

    for (let item of showPasswordButtonsList) {
        item.addEventListener('click', event => {

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
      }

    document.querySelector('.login-submit').addEventListener('click', validateForm)
    document.querySelector('.register-submit').addEventListener('click', validateForm)



    // form navigation
    for (let button of formContainer.querySelectorAll('[data-target]')) {

        const formNodeList = formContainer.children
        
        button.addEventListener('click', event => {

            event.preventDefault();
            
            if(button.getAttribute('type') && button.parentNode.checkValidity() || !button.getAttribute('type')){
                for (let formElement of formNodeList) {

                    for (let input of formElement.querySelectorAll('input')) {
                        input.value = null
                    }

                    formElement.classList.add('d-none')
                    formElement.classList.remove('form__validate')
    
                    if(formElement.getAttribute('id') === button.getAttribute('data-target')){
                        formElement.classList.remove('d-none')
                        formElement.querySelectorAll('input, button')[0].focus()
                    }
                  }
                }
        })
    }
    

});

function validateForm(event) {
    event.preventDefault();
    const formContainer = event.target.parentNode;
    const formValidity = formContainer.checkValidity();

    if(!formValidity) {
        formContainer.querySelector('input:invalid').focus()
        formContainer.classList.add('form__validate')
    }

}