document.addEventListener("DOMContentLoaded", function() {

    let hidePasswordFlag = false

    document.querySelector('.form__show-password').addEventListener('click', event => {

        event.preventDefault()
        const showPasswordbutton = event.target.closest('.form__show-password')
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
    })


});