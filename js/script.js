
// Меню бургер
const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')

if (iconMenu) {
   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock')
      iconMenu.classList.toggle('_active')
      menuBody.classList.toggle('_active')

   })
}

// Прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]')
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick)
   })

   function onMenuLinkClick(e) {
      const menuLink = e.target
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto)
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight

         if (iconMenu.classList.contains('_active')) {
            document.body.classList.toggle('_lock')
            iconMenu.classList.toggle('_active')
            menuBody.classList.toggle('_active')
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         })
         e.preventDefault()
      }
   }
}


// Слайдер

const sliders = (slides, dir, prev, next) => {
   let slideIndex = 1


   const items = document.querySelectorAll(slides)

   function showSlides(n) {
      if (n > items.length) {
         slideIndex = 1
      }

      if (n < 1) {
         slideIndex = items.length
      }

      items.forEach(item => {
         item.classList.add('animated')
         item.style.display = 'none'
      })

      items[slideIndex - 1].style.display = 'block'
   }

   showSlides(slideIndex)

   function plusSlides(n) {
      showSlides(slideIndex += n)
   }

   try {
      const prevBtn = document.querySelector(prev),
         nextBtn = document.querySelector(next)

      prevBtn.addEventListener('click', () => {
         plusSlides(-1)
         items[slideIndex - 1].classList.remove('slideInLeft')
         items[slideIndex - 1].classList.add('slideInRight')
      })

      nextBtn.addEventListener('click', () => {
         plusSlides(1)
         items[slideIndex - 1].classList.remove('slideInRight')
         items[slideIndex - 1].classList.add('slideInLeft')
      })
   } catch (e) { }
}

sliders('.howwork_slider_item', 'horizontal', '.main-prev-btn', '.main-next-btn')

// Аккордион

const accordion = (triggersSelector) => {
   const btns = document.querySelectorAll(triggersSelector)

   btns.forEach(btn => {
      btn.addEventListener('click', function () {

         btns.forEach(btn => {
            if (!this.classList.contains('active-style')) {

               btn.classList.remove('active-style')

               btn.nextElementSibling.classList.remove('active-content')

               btn.nextElementSibling.style.maxHeight = 0 + 'px'
            }

         })

         this.classList.toggle('active-style')
         this.nextElementSibling.classList.toggle('active-content')

         if (this.classList.contains('active-style')) {
            this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px'
         } else {
            this.nextElementSibling.style.maxHeight = '0px'
         }
      })
   })
}

accordion('.accordion-heading')