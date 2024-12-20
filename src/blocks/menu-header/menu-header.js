const burgerButton = document.querySelector('.menu-header__burger')
const menuBackground = document.querySelector('.menu-background')
const menu = document.querySelector('.menu')

burgerButton.addEventListener('click', () => {
  menu.style.transform = 'translateX(-120%)'
  menuBackground.style.opacity = '0'
  setTimeout(function () {
    menuBackground.style.display = 'none'
  }, 300)
})
