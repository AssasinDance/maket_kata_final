const burgerButton = document.querySelector('.upper-menu__burger')
const menuBackground = document.querySelector('.menu-background')
const menu = document.querySelector('.menu')

burgerButton.addEventListener('click', () => {
  menu.style.transform = 'translateX(0)'
  menuBackground.style.display = 'block'
  setTimeout(function () {
    menuBackground.style.opacity = '1'
  }, 10)
})
