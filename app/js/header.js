document.addEventListener("DOMContentLoaded", function() {
    const parent = document.querySelector('.header__container')

    // document.querySelector('hamburger__container').addEventListener('click', event => {
    //     console.log(event.target);
    //   });

      parent.addEventListener('click', event => {
        console.log(event);
    });
});