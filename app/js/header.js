document.addEventListener("DOMContentLoaded", function() {

    const body = document.querySelector('body')
    const parent = document.querySelector('.header__container');
    const contrastIcon = document.querySelector('.contrast-icon')
    const hamburgerIcon = parent.querySelector('.hamburger__container');

    const mobileMenuContainer = parent.querySelector('.header__mobile-menu');
    const mobileMenuItem = mobileMenuContainer.querySelectorAll('.header__menu-item');

    const desktopMenuContainer = parent.querySelector('.header__desktop-menu');
    const desktopMenuItem = desktopMenuContainer.querySelectorAll('.header__menu-item');

      // toggle contrast
      if(localStorage.contrast){
        body.classList.add('contrast')
      }

      contrastIcon.addEventListener('click', () => {

        if(localStorage.contrast){
          body.classList.remove('contrast')
          localStorage.setItem('contrast', '');
        } else {
          body.classList.add('contrast')
          localStorage.setItem('contrast', true);
        }
      });

      // header shrink

      window.addEventListener('scroll', ()=>{
        if(window.pageYOffset > 80) {
          parent.classList.add('header__container--shrink')
        } else if (window.pageYOffset <= 80){
          parent.classList.remove('header__container--shrink')
        }
      })

    // toggle HamburgerMenu events
    
    hamburgerIcon.addEventListener('click', () => {
      toggleMobileMenu()
    });

    // move to page section events for mobile

    for (let item of mobileMenuItem) {
      item.addEventListener('click', event => {
        toggleMobileMenu();
        scrollToPageSection(event, item, '-51px')
      });

      item.addEventListener('keypress', event => {
        if(event.keyCode == 32 || event.keyCode == 13){
          toggleMobileMenu()
          scrollToPageSection(event, item, '-51px')
        } 
      });
    }

    // move to page section events for desktop

    for (let item of desktopMenuItem) {
        item.addEventListener('click', event => {
        scrollToPageSection(event, item, '-148px')
      });

      item.addEventListener('keypress', event => {
        if(event.keyCode == 32 || event.keyCode == 13)
        scrollToPageSection(event, item, '-148px')
      });
    }

    // mark active element depending on scroll position TODO

    // functions

    function toggleMobileMenu() {
      
      body.classList.toggle('overflow-hidden');
      hamburgerIcon.classList.toggle('hamburger__container--active');
      mobileMenuContainer.classList.toggle('header__mobile-menu--active');
      for (let el of mobileMenuContainer.querySelectorAll('.header__menu-item')){
          if(el.getAttribute('tabindex')) el.removeAttribute('tabindex')
          else el.setAttribute("tabindex", -1)
        }
        trapFocus(parent)
    }
    
});

function scrollToPageSection(event, item, offset) {
      
  event.preventDefault()

  const targetId = item.getAttribute('href'); 
  const target = document.querySelector(targetId)
  const pos = target.style.position;
  const top = target.style.top;

  target.style.position = 'relative';
  target.style.top = offset;
  target.scrollIntoView({ behavior: 'smooth'});
  target.style.top = top;
  target.style.position = pos;
  target.querySelector('a, button').focus()
}

function trapFocus(element) {
  const focusableEls = element.querySelectorAll('.focus-trap');
  const firstFocusableEl = focusableEls[0];  
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

      element.addEventListener('keydown', function(e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
        
        if (!isTabPressed) { 
            return; 
        }

        if ( e.shiftKey ) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
              
              lastFocusableEl.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
          }
      });
  }