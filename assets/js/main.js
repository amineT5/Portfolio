/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')
document.addEventListener("DOMContentLoaded", function() {
    const popupLinks = document.querySelectorAll('.popup-link');
    const closePopupIcons = document.querySelectorAll('.close-popup');
    const body = document.querySelector('body');
    let unlock = true;
    const timeout = 300;

    if (popupLinks.length > 0) {
      popupLinks.forEach(link => {
        link.addEventListener("click", function(e) {
          e.preventDefault();
          const popupId = link.getAttribute('href').replace('#', '');
          const currentPopup = document.getElementById(popupId);
          if (currentPopup) {
            popupOpen(currentPopup);
          }
        });
      });
    }

    if (closePopupIcons.length > 0) {
      closePopupIcons.forEach(icon => {
        icon.addEventListener("click", function(e) {
          e.preventDefault();
          popupClose(icon.closest('.popup'));
        });
      });
    }

    function popupOpen(currentPopup) {
      if (currentPopup && unlock) {
        const activePopup = document.querySelector('.popup.open');
        if (activePopup) {
          popupClose(activePopup, false);
        } else {
          bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function(e) {
          if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
          }
        });
      }
    }

    function popupClose(activePopup, doUnlock = true) {
      if (unlock) {
        activePopup.classList.remove('open');
        if (doUnlock) {
          bodyUnlock();
        }
      }
    }

    function bodyLock() {
      const lockPaddingValue = window.innerWidth - document.querySelector('.popup').offsetWidth + 'px';
      body.style.paddingRight = lockPaddingValue;
      body.classList.add('lock');
      unlock = false;
      setTimeout(function() {
        unlock = true;
      }, timeout);
    }

    function bodyUnlock() {
      setTimeout(function() {
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
        unlock = false;
        setTimeout(function() {
          unlock = true;
        }, timeout);
      }, timeout);
    }
  });
/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
