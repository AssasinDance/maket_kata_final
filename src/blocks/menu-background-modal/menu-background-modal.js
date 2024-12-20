const menuBackground = document.querySelector('.menu-background-modal')
const menu = document.querySelectorAll('.menu-phone')

menuBackground.addEventListener('click', () => {
  for (let i = 0; i < menu.length; i++) {
    menu[i].style.transform = 'translateX(140%)'
  }
  menuBackground.style.opacity = '0'
  setTimeout(function () {
    menuBackground.style.display = 'none'
  }, 300)
})
