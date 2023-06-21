const select = document.querySelector('select')
const allLang = ['kz', 'ru']

select.addEventListener('change', changeURLLanguage)

// перенаправить на url с указанием языка
function changeURLLanguage() {
   let lang = select.value
   location.href = window.location.pathname + '#' + lang
   location.reload()
}

function changeLanguage() {
   let hash = window.location.hash
   hash = hash.substr(1)
   console.log(hash)
   if (!allLang.includes(hash)) {
      location.href = window.location.pathname + '#ru'
      location.reload()
   }
   select.value = hash

   for (let key in langArr) {
      let elem = document.querySelector('.lng-' + key)
      if (elem) {
         elem.innerHTML = langArr[key][hash]
      }

   }
}

changeLanguage()

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

const menuLinks = document.querySelectorAll('[data-goto]')
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



// MODAL

function closeModal(modalSelector) {
   const modal = document.querySelector(modalSelector)
   modal.classList.add('hide')
   modal.classList.remove('show')
   document.body.style.overflow = ''
}

function openModal(modalSelector) {
   const modal = document.querySelector(modalSelector)
   modal.classList.add('show')
   modal.classList.remove('hide')
   document.body.style.overflow = 'hidden'
}
function modal(triggerSelector, modalSelector, modalTimerId) {
   // Modal

   const modalTrigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector)

   modalTrigger.forEach(item => {
      item.addEventListener('click', () => {
         openModal(modalSelector)
         setTimeout(() => {
            closeModal(modalSelector)
         }, modalTimerId)
      })
   })

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal(modalSelector)
      }
   })

   document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) {
         closeModal(modalSelector)
      }
   })
}

modal('[data-modal]', '.modal', 4000)