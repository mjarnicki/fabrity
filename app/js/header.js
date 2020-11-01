document.addEventListener("DOMContentLoaded", function() {

    const body = document.querySelector('body')
    const parent = document.querySelector('.header__container')
    const hamburgerIcon = parent.querySelector('.hamburger__container');

    const mobileMenuContainer = parent.querySelector('.header__mobile-menu');
    const mobileMenuItem = mobileMenuContainer.querySelectorAll('.header__menu-item');

    const desktopMenuContainer = parent.querySelector('.header__desktop-menu');
    const desktopMenuItem = desktopMenuContainer.querySelectorAll('.header__menu-item');

    // toggle HamburgerMenu events
    
    hamburgerIcon.addEventListener('click', () => {
      toggleMobileMenu()


    });

    // move to page section events for mobile

    mobileMenuItem.forEach( item => {
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
    })

    // move to page section events for desktop

    desktopMenuItem.forEach( item => {
        item.addEventListener('click', event => {
        scrollToPageSection(event, item, '-148px')
      });

      item.addEventListener('keypress', event => {
        if(event.keyCode == 32 || event.keyCode == 13)
        scrollToPageSection(event, item, '-148px')
      });
    })

    // mark active element depending on scroll position TODO

    // functions

    function toggleMobileMenu() {
      
      body.classList.toggle('overflow-hidden');
      hamburgerIcon.classList.toggle('hamburger__container--active');
      mobileMenuContainer.classList.toggle('header__mobile-menu--active');
      mobileMenuContainer.querySelectorAll('.header__menu-item')
        .forEach( (el) => {
          if(el.getAttribute('tabindex')) el.removeAttribute('tabindex')
          else el.setAttribute("tabindex", -1)
        })
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
}

function trapFocus(element) {
  const focusableEls = element.querySelectorAll('a[href]:not([focus-trap-disabled]), button:not([focus-trap-disabled])');
  const firstFocusableEl = focusableEls[0];  
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

  console.log(element);

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